import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Get the new version from package.json
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
const newVersion = packageJson.version;
const date = new Date().toISOString().split('T')[0];

// Read the current changelog
let changelog = readFileSync('./CHANGELOG.md', 'utf8');

// Get commit messages since last tag
const getCommitsSinceLastTag = () => {
    try {
        const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
        return execSync(`git log ${lastTag}..HEAD --pretty=format:"- %s"`, { encoding: 'utf8' });
    } catch (e) {
        // If no tags exist, get all commits
        return execSync('git log --pretty=format:"- %s"', { encoding: 'utf8' });
    }
};

const commitMessages = getCommitsSinceLastTag();

// Create new version section with proper spacing
const newSection = `

## [${newVersion}] - ${date}

### Changes

${commitMessages}
`;

// Insert new section after the header
const headerEnd = changelog.indexOf('\n## ');
changelog = changelog.slice(0, headerEnd) + newSection + changelog.slice(headerEnd);

// Write back to CHANGELOG.md
writeFileSync('./CHANGELOG.md', changelog);

// Stage the changelog
execSync('git add CHANGELOG.md');
