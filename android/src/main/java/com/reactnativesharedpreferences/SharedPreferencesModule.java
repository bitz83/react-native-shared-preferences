package com.reactnativesharedpreferences;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;

@ReactModule(name = SharedPreferencesModule.NAME)
public class SharedPreferencesModule extends ReactContextBaseJavaModule {
  public static final String NAME = "SharedPreferences";

  private SharedPreferences preferences;

  public SharedPreferencesModule(ReactApplicationContext reactContext) {
    super(reactContext);
    preferences = reactContext.getSharedPreferences("Preferences", Context.MODE_PRIVATE);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void setInt(String key, int value) {
    preferences.edit().putInt(key, value).apply();
  }

  @ReactMethod
  public void setString(String key, String  value) {
    preferences.edit().putString(key, value).apply();
  }

  @ReactMethod
  public void setBool(String key, boolean value) {
    preferences.edit().putBoolean(key, value).apply();
  }

  @SuppressLint("ApplySharedPref")
  @ReactMethod
  public void synchronize(String key, boolean value) {
    preferences.edit().commit();
  }

  @ReactMethod
  public void getInt(String key, Promise promise) {
    promise.resolve(preferences.getInt(key, 0));
  }

  @ReactMethod
  public void getString(String key, Promise promise) {
    promise.resolve(preferences.getString(key, ""));
  }

  @ReactMethod
  public void getBool(String key, Promise promise) {
    promise.resolve(preferences.getBoolean(key, false));
  }

  @ReactMethod
  public void getKeys(Promise promise) {
    WritableArray writableArray = Arguments.fromList(new ArrayList<>(preferences.getAll().keySet()));
    promise.resolve(writableArray);
  }

  @ReactMethod
  public void getAll(Promise promise) {
    Map<String, ?> all = preferences.getAll();
    WritableMap map = Arguments.makeNativeMap((Map<String, Object>) all);
    promise.resolve(map);
  }

  @ReactMethod
  public void removeValue(String key) {
    preferences.edit().remove(key).apply();
  }
}
