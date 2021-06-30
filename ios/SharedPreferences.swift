import Foundation
import React

@objc(SharedPreferences)
class SharedPreferences: RCTEventEmitter {
    private let VALUE_NOT_EXISTS = "VALUE_NOT_EXISTS";
    private let VALUE_NOT_EXISTS_CODE = "1";
    private var defaults: UserDefaults?
    private var suiteName: String!
    var ensureDefaults: UserDefaults {
        guard let def = defaults else {
            fatalError("UserDefaults must be initialized first")
        }
        return def
    }
    
    @objc
    override public static func requiresMainQueueSetup() -> Bool { false }
    
    override func supportedEvents() -> [String]! { [] }
    
    @objc
    func initialize(_ suiteName: String?) {
        self.suiteName = suiteName ?? "\(Bundle.main.bundleIdentifier!)_preferences"
        defaults = UserDefaults.init(suiteName: self.suiteName)!
    }

    @objc
    func setInt(_ key: String, value: Int) {
        ensureDefaults.set(value, forKey: key)
    }
    
    @objc
    func setString(_ key: String, value: String) {
        ensureDefaults.set(value, forKey: key)
    }
    
    @objc
    func setBool(_ key: String, value: Bool) {
        ensureDefaults.set(value, forKey: key)
    }
    
    @objc
    func synchronize() {
        ensureDefaults.synchronize()
    }
    
    
    @objc
    func getInt(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        if ensureDefaults.object(forKey: key) == nil {
            reject(VALUE_NOT_EXISTS_CODE, VALUE_NOT_EXISTS, nil)
            return
        }
        resolve(ensureDefaults.integer(forKey: key))
    }
    
    @objc
    func getString(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        if ensureDefaults.object(forKey: key) == nil {
            reject(VALUE_NOT_EXISTS_CODE, VALUE_NOT_EXISTS, nil)
            return
        }
        resolve(ensureDefaults.string(forKey: key))
    }
    
    @objc
    func getBool(
        _ key: String,
        resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        if ensureDefaults.object(forKey: key) == nil {
            reject(VALUE_NOT_EXISTS_CODE, VALUE_NOT_EXISTS, nil)
            return
        }
        resolve(ensureDefaults.bool(forKey: key))
    }
    
    @objc
    func getKeys(
        _ resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        
        let all = ensureDefaults.persistentDomain(forName: suiteName) ?? [:]
        resolve(Array(all.keys))
    }
    
    @objc
    func getAll(
        _ resolve:RCTPromiseResolveBlock,
        reject:RCTPromiseRejectBlock
    ) {
        resolve(ensureDefaults.persistentDomain(forName: suiteName) ?? [:])
    }
    
    @objc
    func removeValue(_ key: String) {
        ensureDefaults.removeObject(forKey: key)
    }
    
    @objc
    func removeValues(_ keys: NSArray) {
        for key in keys {
            if key is NSString {
                ensureDefaults.removeObject(forKey: key as! String)
            }
        }
    }
    
    @objc
    func removeAll() {
        ensureDefaults.persistentDomain(forName: suiteName)?.forEach {
            ensureDefaults.removeObject(forKey: $0.key)
        }
    }
}
