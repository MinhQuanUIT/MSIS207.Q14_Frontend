const fs = require('fs')
const path = require('path')

// Đường dẫn thư mục data
const DATA_DIR = path.join(__dirname, '../data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

/**
 * Đảm bảo thư mục data tồn tại
 */
function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
    console.log('✅ Created data directory:', DATA_DIR)
  }
}

/**
 * Đọc danh sách users từ file
 * @returns {Array} Mảng users
 */
function loadUsers() {
  try {
    ensureDataDirectory()
    
    if (!fs.existsSync(USERS_FILE)) {
      console.log('📄 users.json not found, creating empty file...')
      saveUsers([])
      return []
    }

    const data = fs.readFileSync(USERS_FILE, 'utf8')
    const users = JSON.parse(data)
    console.log(`✅ Loaded ${users.length} users from file`)
    return users
  } catch (error) {
    console.error('❌ Error loading users:', error.message)
    return []
  }
}

/**
 * Ghi danh sách users vào file
 * @param {Array} users - Mảng users cần lưu
 */
function saveUsers(users) {
  try {
    ensureDataDirectory()
    
    const data = JSON.stringify(users, null, 2) // Format đẹp với indent 2
    fs.writeFileSync(USERS_FILE, data, 'utf8')
    console.log(`💾 Saved ${users.length} users to file`)
    return true
  } catch (error) {
    console.error('❌ Error saving users:', error.message)
    return false
  }
}

/**
 * Thêm 1 user mới vào file
 * @param {Object} user - User object cần thêm
 */
function addUser(user) {
  const users = loadUsers()
  users.push(user)
  saveUsers(users)
  return user
}

/**
 * Xóa tất cả users (reset database)
 */
function clearUsers() {
  saveUsers([])
  console.log('🗑️ Cleared all users')
}

module.exports = {
  loadUsers,
  saveUsers,
  addUser,
  clearUsers
}
