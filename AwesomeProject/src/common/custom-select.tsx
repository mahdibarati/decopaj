/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Box,
  ChevronDownIcon,
  GluestackUIProvider,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {getPersianString} from '../decopaj/utils';

export const CustomSelect = (props: {
  onValueChange?: any;
  list: string[];
  label: string;
}) => {
  return (
    <GluestackUIProvider config={config}>
      <Box display="flex" flexDirection="row">
        <Select
          flex={1}
          onValueChange={value => {
            props.onValueChange(value);
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
              {props.list.map(item => {
                return (
                  <SelectItem
                    key={'si-' + item}
                    label={getPersianString(item)}
                    value={item}
                  />
                );
              })}
            </SelectContent>
          </SelectPortal>
        </Select>
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
    </GluestackUIProvider>
  );
};
