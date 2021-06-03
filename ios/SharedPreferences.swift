import Foundation

@objc(SharedPreferences)
class SharedPreferences: NSObject {
    let defaults = UserDefaults.standard
    let keyPrefix = "SharedPreferences_"

    @objc
    func setInt(_ key: String, value: Int) {
        defaults.set(value, forKey: "\(keyPrefix)\(key)")
    }
    
    @objc
    func setString(_ key: String, value: String) {
        defaults.set(value, forKey: "\(keyPrefix)\(key)")
    }
    
    @objc
    func setBool(_ key: String, value: Bool) {
        defaults.set(value, forKey: "\(keyPrefix)\(key)")
    }
    
    @objc
    func synchronize() {
        defaults.synchronize()
    }
    
    
    @objc
    func getInt(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(defaults.integer(forKey: "\(keyPrefix)\(key)"))
    }
    
    @objc
    func getString(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(defaults.string(forKey: "\(keyPrefix)\(key)"))
    }
    
    @objc
    func getFloat(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(defaults.float(forKey: "\(keyPrefix)\(key)"))
    }
    
    @objc
    func getBool(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(defaults.bool(forKey: "\(keyPrefix)\(key)"))
    }
    
    @objc
    func getKeys(
        _ resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(defaults.dictionaryRepresentation().keys.filter {
            $0.starts(with: keyPrefix)
        }.map { $0.replacingOccurrences(of: keyPrefix, with: "") })
    }
    
    @objc
    func getAll(
        _ resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        var result: [String: Any] = [:]
        for entry in defaults.dictionaryRepresentation() {
            if entry.key.starts(with: keyPrefix) {
                result[entry.key.replacingOccurrences(of: keyPrefix, with: "")] = entry.value
            }
        }
        resolve(result)
    }
}
