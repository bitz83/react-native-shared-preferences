import Foundation

@objc(SharedPreferences)
class SharedPreferences: NSObject {

    @objc
    func setInt(_ key: String, value: Int) {
        UserDefaults.standard.set(value, forKey: key)
    }
    
    @objc
    func setString(_ key: String, value: String) {
        UserDefaults.standard.set(value, forKey: key)
    }
    
    @objc
    func setFloat(_ key: String, value: Float) {
        UserDefaults.standard.set(value, forKey: key)
    }
    
    @objc
    func setBool(_ key: String, value: Bool) {
        UserDefaults.standard.set(value, forKey: key)
    }
    
    @objc
    func synchronize() {
        UserDefaults.standard.synchronize()
    }
    
    
    @objc
    func getInt(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(UserDefaults.standard.integer(forKey: key))
    }
    
    @objc
    func getString(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(UserDefaults.standard.string(forKey: key))
    }
    
    @objc
    func getFloat(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(UserDefaults.standard.float(forKey: key))
    }
    
    @objc
    func getBool(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(UserDefaults.standard.bool(forKey: key))
    }
}
