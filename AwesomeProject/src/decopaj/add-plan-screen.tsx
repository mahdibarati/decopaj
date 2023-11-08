/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Box, GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {CustomSelect} from '../common/custom-select';
import {CameraType, getCameraType} from './model';
import {addData} from './db';
import {guid} from './utils';

export const AddPlanSceen = props => {
  const [cameraType, setCameraType] = useState(1);
  const [cameraTypeName, setCameraTypeName] = useState('1');
  const [count, setCount] = useState('1');

  return (
    <GluestackUIProvider config={config}>
      <View
        style={{
          margin: 10,
        }}>
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
              title="ثبت"
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
                  Navigation.popToRoot(props.componentId, {});
                });
              }}
            />
          </View>
        </Box>
      </View>
    </GluestackUIProvider>
  );
};
