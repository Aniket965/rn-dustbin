import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import firebase from "firebase";
import { IOTref } from "./constant";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 0
    };
  }

  componentWillMount() {
    IOTref.limitToLast(1).on("child_added", snapshot => {
      let str = snapshot.val()["dist"] + "";
      this.setState({
        data: 100 - parseFloat(str.substr(0, 2)) * 4
      });
      // console.log(snapshot.val())
    });
  }

  render() {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#282C2A"
        }}
      >
        <View style={styles.button}>
          <Text style={styles.title}> Dustbin </Text>
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              display: "flex",
              flex:1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                margin: 32,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor:'#343434',
                // elevation:6,
                borderRadius:5
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AnimatedCircularProgress
                  size={240}
                  width={10}
                  fill={this.state.data}
                  tintColor={this.state.data < 50 ? "#51E45E" : "#ff1919"}
                  style={{ backgroundColor: "transparent",margin:32 }}
                  onAnimationComplete={() => {}}
                  backgroundColor="#eee"
                />
                <Text
                  style={{
                    position: "absolute",
                    color: this.state.data < 50 ? "#51E45E" : "#ff1919",
                    fontFamily: "PressStart2P-Regular",
                    fontSize: 36
                  }}
                >
                  {this.state.data}%
                </Text>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 24,
                  fontSize: 32,
                  color: "#F1F4F1",
                  fontFamily: "PressStart2P-Regular"
                }}
              >
                Dustbin North West
              </Text>
            </View>
            {/* <View
              style={{
                margin: 16,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AnimatedCircularProgress
                  size={120}
                  width={10}
                  fill={this.state.data}
                  tintColor="rgb(13, 143, 229)"
                  style={{ backgroundColor: "transparent" }}
                  onAnimationComplete={() => {}}
                  backgroundColor="#eee"
                />
                <Text style={styles.percentage1}>{this.state.data}%</Text>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 8,
                  fontSize: 24,
                  color: "rgb(13, 143, 229)",
                  fontFamily: "PressStart2P-Regular"
                }}
              >
                Dustbin 2
              </Text>
            </View> */}
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    flex: 1,
    marginTop: 24,
    color: "white",
    display: "flex",
    fontFamily: "PressStart2P-Regular"
    // backgroundColor:'red'
  },
  percentage: {
    position: "absolute",
    color: "#51E45E",
    fontFamily: "PressStart2P-Regular",
    fontSize: 36
  },
  percentage1: {
    position: "absolute",
    color: "rgb(13, 143, 229)",
    fontFamily: "PressStart2P-Regular",
    fontSize: 24
  },
  button: {
    flex: 1,
    backgroundColor: "#343434",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    width: "100%"
  }
});
