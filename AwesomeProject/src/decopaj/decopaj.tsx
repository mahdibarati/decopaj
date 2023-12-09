/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from './colors';
import {deleteData, getStoreData} from './db';
import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Divider,
  EditIcon,
  GluestackUIProvider,
  RemoveIcon,
  ScrollView,
  TrashIcon,
} from '@gluestack-ui/themed';
import {getImage, getPersianDigitString} from './utils';
import {AddPlanDialog} from './add-plan-dialog';
import {config} from '@gluestack-ui/config';
import {Alert} from 'react-native';
import Text from '../common/text';
import LinearGradient from 'react-native-linear-gradient';
import {getCameraType, getCameraTypeValue} from './model';

export const DecopajScreen = (props: {
  navigation: any;
  componentId: string;
}) => {
  const [openAddPlan, setOpenAddPan] = useState(false);
  const [list, setList] = useState<[] | undefined>();
  const {navigation} = props;
  useEffect(() => {
    refrshList();
  }, []);

  const refrshList = () => {
    // Alert.alert('1');
    getStoreData().then(ls => {
      if (ls) setList(ls);
    });

    //if (ls) setList(ls);
    // .then((ls: any) => {
    //   setList(ls);
    // });
  };

  const getList = () => {
    if (list) {
      return list.map((item: any, index: number) => {
        return (
          <Box
            key={'p-' + index}
            width="50%"
            style={{
              position: 'relative',
              paddingTop: 4,
              marginTop: 4,
            }}>
            <Box
              style={{
                // maxWidth: 'fit-content',
                margin: 2,
                // ViewShadow: 'none',
                borderColor: 'transparent',
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}>
              <View>
                <Box paddingHorizontal={8} paddingVertical={16} gap={5}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="row"
                    mt={1}
                    gap={3}>
                    <Text
                      isBold
                      style={{
                        color: colors.text,
                      }}>
                      {getPersianDigitString(item.cameraTypeName)}
                    </Text>
                    <Text style={{color: colors.text}}>نوع دوربین</Text>
                  </Box>
                  <Divider bg="black" />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection="row"
                    mt={1}
                    gap={13}>
                    <Text isBold>{getPersianDigitString(item.count)}</Text>
                    <Text style={{color: colors.text}}>تعداد بازیگر</Text>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between">
                    <Button
                      borderRadius="$full"
                      size="md"
                      bg={'transparent'}
                      width={10}
                      onPress={() => {
                        //deletePlan(index);
                        deleteData(item.id).then(() => {
                          refrshList();
                        });
                      }}>
                      {/* EditIcon is imported from 'lucide-react-native' */}
                      <ButtonIcon as={TrashIcon} color={colors.error} />
                    </Button>
                    {getImage(item.cameraTypeName) && (
                      <Image
                        source={getImage(item.cameraTypeName)}
                        style={{
                          alignSelf: 'center',
                          width: 35,
                          height: 35,
                          resizeMode: 'contain',
                          borderWidth: 1,
                          borderColor: '#757575',
                          borderRadius: 5,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </View>
            </Box>
            <Text
              iswhite
              fontSize={14}
              style={{
                position: 'absolute',
                left: 8,
                top: 0,
                borderRadius: 5,
                // border: '1px solid #aaa',
                backgroundColor: colors.primary,
                width: 30,
                height: 20,
                textAlign: 'center',
              }}>
              {getPersianDigitString(index + 1)}
            </Text>
          </Box>
        );
      });
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <LinearGradient
        colors={['#ED1E79', '#662D8C']}
        style={styles.linearGradient}>
        <View
          style={{
            padding: 0,
            height: '100%',
          }}>
          <View>
            <AddPlanDialog
              open={openAddPlan}
              onClose={() => {
                setOpenAddPan(false);
                refrshList();
              }}></AddPlanDialog>
            <View>
              <Text
                iswhite
                isBold
                borderRadius={4}
                style={{
                  backgroundColor: colors.secondary,
                  marginTop: 10,
                  padding: 8,
                }}>
                لیست پلان ها
              </Text>
            </View>
            <ScrollView>
              <View>
                <Box
                  flex={1}
                  flexDirection="row"
                  flexWrap="wrap"
                  alignItems="flex-end"
                  direction="rtl">
                  {getList()}
                </Box>
              </View>
            </ScrollView>
          </View>
          <Button
            borderRadius="$full"
            size="lg"
            //  p="$3.5"
            position="absolute"
            bottom={10}
            right={10}
            bg={colors.primary}
            onPress={() => {
              setOpenAddPan(true);
            }}>
            {/* EditIcon is imported from 'lucide-react-native' */}
            <ButtonText marginRight={10} fontFamily="IRANYekanWebBold">
              افزودن پلان
            </ButtonText>
            <ButtonIcon as={AddIcon} />
          </Button>
        </View>
      </LinearGradient>
    </GluestackUIProvider>
  );
};

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
