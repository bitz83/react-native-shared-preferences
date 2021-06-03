import Foundation

@objc(SharedPreferences)
class SharedPreferences: NSObject {
    private let VALUE_NOT_EXISTS = "VALUE_NOT_EXISTS";
    private let VALUE_NOT_EXISTS_CODE = "1";
    lazy var identifier = Bundle.main.bundleIdentifier!
    lazy var suiteName = "\(identifier)_preferences"
    lazy var defaults = UserDefaults.init(suiteName: suiteName)!

    @objc
    func setInt(_ key: String, value: Int) {
        defaults.set(value, forKey: key)
    }
    
    @objc
    func setString(_ key: String, value: String) {
        defaults.set(value, forKey: key)
    }
    
    @objc
    func setBool(_ key: String, value: Bool) {
        defaults.set(value, forKey: key)
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
        if defaults.object(forKey: key) == nil {
            reject(VALUE_NOT_EXISTS_CODE, VALUE_NOT_EXISTS, nil)
            return
        }
        resolve(defaults.integer(forKey: key))
    }
    
    @objc
    func getString(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        if defaults.object(forKey: key) == nil {
            reject(VALUE_NOT_EXISTS_CODE, VALUE_NOT_EXISTS, nil)
            return
        }
        resolve(defaults.string(forKey: key))
    }
    
    @objc
    func getBool(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        if defaults.object(forKey: key) == nil {
            reject(VALUE_NOT_EXISTS_CODE, VALUE_NOT_EXISTS, nil)
            return
        }
        resolve(defaults.bool(forKey: key))
    }
    
    @objc
    func getKeys(
        _ resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        
        let all = defaults.persistentDomain(forName: suiteName) ?? [:]
        resolve(Array(all.keys))
    }
    
    @objc
    func getAll(
        _ resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(defaults.persistentDomain(forName: suiteName) ?? [:])
    }
    
    @objc
    func removeValue(_ key: String) {
        defaults.removeObject(forKey: key)
    }
    
    @objc
    func removeValues(_ keys: NSArray) {
        for key in keys {
            if key is NSString {
                defaults.removeObject(forKey: key as! String)
            }
        }
    }
    
    @objc
    func removeAll() {
        defaults.persistentDomain(forName: suiteName)?.forEach {
            defaults.removeObject(forKey: $0.key)
        }
    }
}
