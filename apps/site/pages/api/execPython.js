// pages/api/execPython.js
import { exec } from 'child_process';

export default function handler(req, res) {
    const { cmd } = req.query;

    // Execute the Python script using child_process.exec
    exec(`python resumeparser/resumeparser.py`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing Python script:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        
        if (stderr) {
            console.error('Python script returned an error:', stderr);
            res.status(400).json({ error: 'Bad request' });
            return;
        }

        console.log('Python script output:', stdout);
        res.status(200).json({ output: stdout });
    });
}
