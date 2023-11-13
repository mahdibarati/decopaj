import React from 'react';
import {Text} from '@gluestack-ui/themed';
import {colors} from '../decopaj/colors';
export default (props: any) => (
  <Text
    {...props}
    style={{
      ...props.style,
      fontFamily: props.isBold ? 'IRANYekanWebBold' : 'IRANYekanWebLight',
      color: props.iswhite ? 'white' : colors.text,
    }}>
    {props.children}
  </Text>
);
