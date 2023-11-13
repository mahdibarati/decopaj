/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Navigation, Modal as RNNModal} from 'react-native-navigation';
import {Box, Button, ButtonText} from '@gluestack-ui/themed';
import {CustomSelect} from '../common/custom-select';
import {CameraType, getCameraType, getCameraTypeValue} from './model';
import {addData} from './db';
import {guid} from './utils';

export const AddPlanDialog = props => {
  const [cameraType, setCameraType] = useState(1);
  const [cameraTypeName, setCameraTypeName] = useState(getCameraTypeValue(1));
  const [count, setCount] = useState('1');

  return (
    <RNNModal
      // onShow={/* optional callback */}
      animationType="slide" //{/* optional, 'none' | 'fade' | 'slide', default 'slide'*/}
      //blurOnUnmount={/* optional, default false */}
      //transparent={/* optional, default false, true behaves as overCurrentContext */}
      visible={props.open}
      onRequestClose={() => {
        props.onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Box style={{backgroundColor: 'white'}}>
            {/* <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
          افزودن پلان
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: 'absolute',
            left: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton> */}
            <Box p={10} gap={10}>
              <Box display="flex" flexDirection="row">
                <CustomSelect
                  label="نوع دوربین"
                  onValueChange={(value: string) => {
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
                />
              </Box>
              <View>
                <Button
                  onPress={() => {
                    // saveData({
                    //   cameraTypeName: cameraTypeName,
                    //   cameraType: getCameraType(cameraTypeName),
                    //   count: count,
                    // });
                    // saveData(guid(), cameraTypeName, cameraType, count);
                    const id = guid();
                    addData({
                      id,
                      cameraTypeName,
                      cameraType,
                      count,
                    }).then(() => {
                      props.onClose();
                      Navigation.popToRoot(props.componentId, {});
                    });
                  }}>
                  <ButtonText marginRight={10} fontFamily="IRANYekanWebBold">
                    ثبت
                  </ButtonText>
                </Button>
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
    marginTop: 22,
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
