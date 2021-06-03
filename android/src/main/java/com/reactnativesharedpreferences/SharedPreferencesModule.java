package com.reactnativesharedpreferences;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

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
  public void setFloat(String key, String value) {
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
  public void getFloat(String key, Promise promise) {
    promise.resolve(preferences.getString(key, "0.0"));
  }

  @ReactMethod
  public void getBool(String key, Promise promise) {
    promise.resolve(preferences.getBoolean(key, false));
  }
}
