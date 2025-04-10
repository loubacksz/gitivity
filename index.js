#!/usr/bin/env node
//used to specify the interpreter that should be used to run the script

const {Command} = require("commander");
const https = require('node:https');
const commands = new Command();

    // CLI description
commands
    .name('gitvity')
    .description('A CLI tool that allows you to see recent activity of a GitHub user!')
    .version('1.0.0');

    // CLI commands
commands
    .argument('<username>')
    .action((username) => {
        // options -> OBJECT THAT DIFINES THE REQUEST
        const options = {
            hostname: 'api.github.com',
            path: `/users/${username}/events`,
            port: 443,
            method: 'GET',
            headers: {'User-Agent': 'gitivity'}
        };

        // req -> OBJECT THAT "MANAGES"/REPRESENTS THE REQUEST | ClinetRequest
        // res -> OBJECT THAT "MANAGES"/REPRESENTS THE RESPONSE | IncomingMessage
        const req = https.request(options, (res) =>{
            
            let body = '';

            res.setEncoding('utf8');
            // sets the character encoding for data read from the Readable stream

            res.on('data', (chunk) => {
            // 'data' event is emitted whenever the stream is relinquishing ownership of a chunk of data to a consumer
            // this may occur by attaching a listener callback to the 'data' event
                body += chunk;
            });

            res.on('end', () => {
            // 'end' event is emitted when there is no more data to be consumed from the stream
                try {
                    const events = JSON.parse(body);
                    if(events.length === 0){
                        console.log('no recent activity found');
                        return;
                    }
                    events.forEach(event => {
                        let action;
                        switch(event.type){
                            case 'PushEvent':
                                const commitCount = event.payload.commits.length;
                                action = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
                                break;
                            case 'IssuesEvent':
                                action = `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} an issue in ${event.repo.name}`;
                                break;
                            case 'CreateEvent':
                                action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                                break;
                            case 'IssueCommentEvent':
                                action = `${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} an issue in ${event.repo.name}`;
                                break;
                                default:
                                    action = `${event.type.replace("Event", "")} in ${event.repo.name}`;
                                    break;
                        }
                        console.log(`- ${action}`);
                    });
                } 
                catch(err) {
                    console.error(err);
                }
            });

        }); 
        
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });
        
        req.end();
    });

commands.parse(process.argv);
// responsible for processing command-line arguments and executing the appropriate logic based on the user's input