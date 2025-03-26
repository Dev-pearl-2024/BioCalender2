import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { fonts } from "../utilities/fonts";
import { colors } from "../utilities/colors";
import Image from "./Image";
import Icon, { IconTypes } from "./Icon";
import TextComponent from "./TextComponent";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Input = (props) => {
  const [isPassword, setIsPassword] = useState(props.isPassword);
  const [error, setError] = useState(null);

  return (
    <>
      <View
        style={[
          styles.inputContainer,
          { ...props?.style },
          {
            borderWidth: props?.light ? 0 : 1,
            borderColor: error ? colors?.RED : colors?.PRIMARY,
            borderBottomWidth: 1
          }
        ]}
      >
        {props?.leftIcon && (
          <TouchableOpacity onPress={props?.onleftIconPress}>
            {props?.leftIcon}
          </TouchableOpacity>
        )}

        <TextInput
          style={[
            styles.input,
            {
              width:
                props?.leftIcon && (props?.rightIcon || props?.isPassword)
                  ? "85%"
                  : props?.rightIcon ||
                    props?.leftIcon ||
                    props?.isPassword ||
                    props?.search
                  ? "90%"
                  : "100%",
              height: props?.multiline ? null : 40,
              ...props.TextInputStyle
            }
          ]}
          editable={!props?.disabled} // Prevents editing
          onChangeText={(text) => {
            if (!props?.disabled) {
              props?.onChangeText?.(text); // Only updates if not disabled
            }
          }}
          value={props?.value}
          placeholder={props?.placeholder}
          secureTextEntry={isPassword}
          maxLength={props?.maxLength}
          keyboardType={props?.keyboardType}
          onSubmitEditing={props.onSubmitEditing}
          numberOfLines={props?.numberOfLines}
          placeholderTextColor={props?.placeholderTextColor || colors.WHITE}
          multiline={props?.multiline}
          onFocus={props?.onFocus}
          onBlur={() => {
            if (props?.onBlur) props?.onBlur();
            setError(props.error);
          }}
        />

        {props?.rightIcon && (
          <TouchableOpacity onPress={props?.onRightIconPress}>
            {props?.rightIcon}
          </TouchableOpacity>
        )}

        {props?.search && (
         <AntDesign name="search1" size={22} color={colors?.PRIMARY} />
        )}

        {props?.isPassword && (
          <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
            {isPassword ? (
             <Feather name="eye-off" size={18} color={colors.WHITE} />
            ) : (
              <Feather name="eye" size={18} color={colors.WHITE} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <TextComponent
          text={error}
          style={{
            color: colors?.RED,
            fontSize: 12,
            marginTop: 5,
            alignSelf: "flex-start",
            marginLeft: 22
          }}
        />
      )}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    padding: 5,
    gap: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  input: {
    borderRadius: 30,
    fontSize: 13,
    fontFamily: fonts?.REGULAR,
    color: colors.WHITE,
    textAlignVertical: "top"
  },
  search_icon: {
    width: 15,
    height: 15
  }
});
