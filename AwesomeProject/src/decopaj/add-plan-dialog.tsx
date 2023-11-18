/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modal as RNNModal} from 'react-native-navigation';
import {Box, Button, ButtonText, Text} from '@gluestack-ui/themed';
import {CustomSelect} from '../common/custom-select';
import {CameraType, getCameraType, getCameraTypeValue} from './model';
import {addData} from './db';
import {guid} from './utils';
import {colors} from './colors';
import Canvas from 'react-native-canvas';

export const AddPlanDialog = props => {
  const [cameraType, setCameraType] = useState<number | undefined>();
  const [cameraTypeName, setCameraTypeName] = useState<
    CameraType | undefined
  >();
  const [count, setCount] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      //@ts-ignore
      const ctx = ref.current.getContext('2d');
      if (ctx) {
        //@ts-ignore
        drawActor(ref.current, ctx, ref.current.width, ref.current.height);
      }
    }
  }, [count]);

  const drawActor = (canvas: any, ctx: any, width: number, height: number) => {
    canvas.height = (width * 9) / 16;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'red';
    if (cameraType) {
      if (getCameraTypeValue(cameraType) === CameraType.CloseUp) {
        ctx.fillRect(20, 20, width - 40, (width * 9) / 16 - 40);
      } else {
        for (let i = 0; i < count; i++) {
          ctx.fillRect(i * 50, 20, 20, 100);
          //ctx.fillText(i.toString(), 20 + i * 50, 10);
        }
      }
    }
    ctx.restore();
  };

  return (
    <RNNModal
      // onShow={/* optional callback */}
      animationType="slide" //{/* optional, 'none' | 'fade' | 'slide', default 'slide'*/}
      transparent={true}
      visible={props.open}
      onRequestClose={() => {
        setCameraType(undefined);
        setCount(1);
        props.onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Box style={{backgroundColor: 'white'}}>
            <Canvas
              ref={ref}
              style={{
                width: '100%',
                height: '50%',
              }}
            />

            <Box p={10} gap={10}>
              <Box display="flex" flexDirection="row">
                <CustomSelect
                  label="نوع دوربین"
                  onValueChange={(value: CameraType) => {
                    setCameraTypeName(value);
                    setCameraType(getCameraType(value));
                  }}
                  list={Object.values(CameraType)}
                />
              </Box>
              <Box bgColor="red" borderColor="red" backgroundColor="red" />
              <Box>
                <CustomSelect
                  label="تعداد بازیگر"
                  onValueChange={(value: string) => {
                    setCount(value);
                  }}
                  list={['1', '2', '3', '4', '5']}
                  value={count}
                />
              </Box>
              <View>
                <Box display="flex" flexDirection="row" gap={'$1'}>
                  <Button
                    flex={1}
                    bg="white"
                    borderColor={colors.primary}
                    borderWidth={1}
                    onPress={() => {
                      props.onClose();
                    }}>
                    <ButtonText
                      marginRight={10}
                      color={colors.primary}
                      fontFamily="IRANYekanWebBold">
                      انصراف
                    </ButtonText>
                  </Button>
                  <Button
                    flex={1}
                    bg={colors.primary}
                    onPress={() => {
                      if (cameraType) {
                        const id = guid();
                        addData({
                          id,
                          cameraTypeName,
                          cameraType,
                          count,
                        }).then(() => {
                          props.onClose();
                          // Navigation.popToRoot(props.componentId, {});
                        });
                      } else {
                        Alert.alert('لطفا نوع دوربین را انتخاب کنید.');
                      }
                    }}>
                    <ButtonText marginRight={10} fontFamily="IRANYekanWebBold">
                      ثبت
                    </ButtonText>
                  </Button>
                </Box>
              </View>
            </Box>
          </Box>
        </View>
      </View>
    </RNNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
