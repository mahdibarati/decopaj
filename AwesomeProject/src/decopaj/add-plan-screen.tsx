/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Box, GluestackUIProvider, Text} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {CustomSelect} from '../common/custom-select';

export const AddPlanSceen = props => {
  // const [cameraType, setCameraType] = useState('1');
  // const [cameraTypeName, setCameraTypeName] = useState('1');
  const [count, setCount] = useState('1');

  return (
    <GluestackUIProvider config={config}>
      <View>
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
              label="نوع دوربین:"
              onValueChange={(value: string) => {
                setCount(value);
              }}
              list={['1', '2', '3', '4', '5']}
            />
            {/* <Select
                value={cameraType}
                onChange={(event: any) => {
                  const {
                    target: {value},
                  } = event;

                  setCameraType(value);
                  setCameraTypeName(value);
                }}
                fullWidth>
                {Object.values(CameraType).map((item, index) => {
                  return (
                    <MenuItem key={'mi-' + index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select> */}
          </Box>
          <Box>
            <CustomSelect
              label="تعداد بازیگر"
              onValueChange={(value: string) => {
                setCount(value);
              }}
              list={['1', '2', '3', '4', '5']}
            />
            {/* <Select
              flex={1}
              onValueChange={value => {
                setCount(value);
              }}
              style={{
                borderColor: 'red',
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <SelectTrigger variant="underlined" size="md">
                <SelectIcon mr="$3">
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
                <SelectInput placeholder="تعداد بازیگر" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label={getPersianDigitString(1)} value="1" />
                  <SelectItem label={getPersianDigitString(2)} value="2" />
                  <SelectItem label={getPersianDigitString(3)} value="3" />
                  <SelectItem label={getPersianDigitString(4)} value="4" />
                  <SelectItem label={getPersianDigitString(5)} value="5" />
                </SelectContent>
              </SelectPortal>
            </Select> */}
            {/* <Text
              flex={1}
              style={{
                textAlign: 'right',
                marginTop: 'auto',
                marginBottom: 'auto',
                width: '50%',
              }}>
              تعداد بازیگر
            </Text> */}
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
                // const id = guid();
                // addData(Stores.Plans, {
                //   id,
                //   cameraTypeName,
                //   cameraType,
                //   count,
                // }).then(() => {
                //   props.onClose();
                // });
                Navigation.popToRoot(props.componentId);
              }}
            />
          </View>
        </Box>
      </View>
    </GluestackUIProvider>
  );
};
