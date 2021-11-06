package com.reactnativesharedpreferences;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

import java.util.ArrayList;
import java.util.Map;

@ReactModule(name = SharedPreferencesModule.NAME)
public class SharedPreferencesModule extends ReactContextBaseJavaModule {
  public static final String NAME = "SharedPreferences";
  private static final String VALUE_NOT_EXISTS = "VALUE_NOT_EXISTS";
  private static final String VALUE_NOT_EXISTS_CODE = "1";

  private SharedPreferences preferences;

  @NonNull
  private SharedPreferences ensurePreferences() {
    if (preferences == null) {
      throw new RuntimeException("SharedPreferences must be initialized first");
    }
    return preferences;
  }

  public SharedPreferencesModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  public void initialize(@Nullable String suiteName) {
    String name = suiteName;
    if (name == null) suiteName = BuildConfig.LIBRARY_PACKAGE_NAME;
    preferences = getReactApplicationContext().getSharedPreferences(suiteName, Context.MODE_PRIVATE);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void setInt(String key, int value) {
    ensurePreferences().edit().putInt(key, value).apply();
  }

  @ReactMethod
  public void setString(String key, String  value) {
    ensurePreferences().edit().putString(key, value).apply();
  }

  @ReactMethod
  public void setBool(String key, boolean value) {
    ensurePreferences().edit().putBoolean(key, value).apply();
  }

  @SuppressLint("ApplySharedPref")
  @ReactMethod
  public void synchronize(String key, boolean value) {
    ensurePreferences().edit().commit();
  }

  @ReactMethod
  public void getInt(String key, Promise promise) {
    if (!ensurePreferences().contains(key)) {
      promise.reject(VALUE_NOT_EXISTS_CODE, VALUE_NOT_EXISTS);
      return;
    }
    promise.resolve(ensurePreferences().getInt(key, 0));
  }

  @ReactMethod
  public void getString(String key, Promise promise) {
    if (!ensurePreferences().contains(key)) {
      promise.reject(VALUE_NOT_EXISTS_CODE, VALUE_NOT_EXISTS);
      return;
    }
    promise.resolve(ensurePreferences().getString(key, ""));
  }

  @ReactMethod
  public void getBool(String key, Promise promise) {
    if (!ensurePreferences().contains(key)) {
      promise.reject(VALUE_NOT_EXISTS_CODE, VALUE_NOT_EXISTS);
      return;
    }
    promise.resolve(ensurePreferences().getBoolean(key, false));
  }

  @ReactMethod
  public void getKeys(Promise promise) {
    WritableArray writableArray = Arguments.fromList(new ArrayList<>(ensurePreferences().getAll().keySet()));
    promise.resolve(writableArray);
  }

  @ReactMethod
  public void getAll(Promise promise) {
    Map<String, ?> all = ensurePreferences().getAll();
    WritableMap map = Arguments.makeNativeMap((Map<String, Object>) all);
    promise.resolve(map);
  }

  @ReactMethod
  public void removeValue(String key) {
    ensurePreferences().edit().remove(key).apply();
  }

  @ReactMethod
  public void removeValues(ReadableArray keys) {
    SharedPreferences.Editor edit = ensurePreferences().edit();
    for (int i = 0; i < keys.size(); i++) {
      String key = keys.getString(i);
      if (key != null) edit.remove(key);
    }
    edit.apply();
  }

  @ReactMethod
  public void removeAll() {
    ensurePreferences().edit().clear().apply();
  }
}
