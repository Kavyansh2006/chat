const fs = require('fs');
const path = require('path');

// 1. Update backend/config/.env
const envPath = path.join(__dirname, 'backend', 'config', '.env');
const correctContent = `PORT=5000\nMONGO_URI=mongodb+srv://mittalkavyansh396_db_user:Kabu2006@cluster0.blimg7u.mongodb.net/?appName=Cluster0\n`;
try {
  fs.writeFileSync(envPath, correctContent);
  console.log("Successfully updated backend/config/.env");
} catch (e) {
  console.error("Error writing backend/config/.env:", e.message);
}

// 2. Delete temporary files
const filesToDelete = [
  path.join(__dirname, 'read_env.js'),
  path.join(__dirname, 'copy_script.js'),
  path.join(__dirname, 'backend', 'config', 'env_copy.txt'),
  path.join(__dirname, 'backend', 'env_copy.txt'),
  path.join(__dirname, 'backend', 'test_db.js'),
  path.join(__dirname, 'test_db.js')
];

filesToDelete.forEach(f => {
  try {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log(`Deleted ${path.basename(f)}`);
    }
  } catch (e) {
    console.error(`Error deleting ${f}:`, e.message);
  }
});
