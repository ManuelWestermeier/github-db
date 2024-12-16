import GitHubFS from "./github-fs.js";
import { GITHUB_API_TOKEN } from "../api-token.js";

const githubFS = new GitHubFS({
    authToken: GITHUB_API_TOKEN,
    owner: "manuelwestermeier",
    repo: "data-test",
    defaultCommitter: {
        email: "westermeier111@gmail.com",
        name: "Manuel Westermeier",
    }
});

// File configuration
const filePath = "README.md";
const fileContent = "# Hello GitHubFS\nThis file is managed by GitHubFS!";
const commitMessage = "Add README";

(async () => {
    try {
        // Create or update the file
        const createResponse = await githubFS.createOrUpdateFile(filePath, fileContent, commitMessage);
        console.log("Created/Updated File Response:", createResponse);

        // Read the file content
        const content = await githubFS.getFileContent(filePath);
        console.log("File Content:", content);

        // Get file metadata
        const metadata = await githubFS.getFileMetadata(filePath);
        console.log("File Metadata:", metadata);

        // Delete the file
        const deleteResponse = await githubFS.deleteFile(filePath, "Deleting README", metadata.sha);
        console.log("Deleted File Response:", deleteResponse);
    } catch (error) {
        console.error("Error:", error);
    }
})();
