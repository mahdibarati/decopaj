/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Box} from '@gluestack-ui/themed';
import {getPersianString} from '../decopaj/utils';
import {colors} from '../decopaj/colors';
import Text from './text';

export const CustomSelect = (props: {
  onValueChange?: any;
  list: string[];
  label: string;
}) => {
  const [selected, setSelected] = useState('');
  return (
    <Box display="flex" flexDirection="row" width={'100%'} style={{}}>
      <Box
        flex={2}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        alignContent="flex-end"
        alignItems="flex-end"
        alignSelf="flex-end">
        {props.list.map(item => {
          return (
            <Box
              key={'si-' + item}
              borderRadius={4}
              borderColor={selected === item ? colors.primary : '#bbb'}
              backgroundColor={selected === item ? colors.primary : '#eee'}
              borderWidth={1}
              paddingHorizontal={8}
              paddingVertical={4}
              margin={4}
              marginBottom={4}
              alignContent="flex-end"
              alignItems="flex-end"
              alignSelf="flex-end"
              onTouchStart={() => {
                setSelected(item);
                props.onValueChange(item);
              }}>
              <Text fontSize={14} iswhite={selected === item}>
                {getPersianString(item)}
              </Text>
            </Box>
          );
        })}
      </Box>

      <Text
        flex={1}
        style={{
          textAlign: 'right',
          marginTop: 'auto',
          marginBottom: 'auto',
          width: '50%',
        }}>
        {props.label}
      </Text>
    </Box>
  );
};
