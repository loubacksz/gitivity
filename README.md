# gitvity

> 🛠️ A simple Node.js CLI tool to fetch and display recent GitHub activity for a specified user.

## 📦 About

**gitvity** is a command-line interface (CLI) application built with Node.js that allows users to quickly view the most recent public GitHub activity of any user. It leverages the GitHub Events API and supports multiple event types like pushes, issue comments, and repository creations.

---

## 🔧 Installation

To install globally via `npm`, clone this repo and run:

```bash
npm install -g
```
- Make sure your system has Node.js installed.

---

## Usage

```sh
gitvity <github-username>
```

- Example

```sh
gitvity torvalds
```

---

## 🛠️ Development
To run the tool locally:

Clone the repository:

```sh
git clone <repo-url>
cd gitvity
```

Run it using:

```sh
node index.js <github-username>
```
Note: Make sure the file is executable (chmod +x index.js) if you want to run it as a standalone script.

---

## Limitations

- Only fetches the latest 30 public events (GitHub API default).

- Does not support authenticated requests, so it may hit GitHub's unauthenticated rate limit (60 requests/hour per IP).

---

## License

This project is open-source and available under the MIT License.