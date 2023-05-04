import React, {useEffect, useState} from 'react';
import Container from '../../components/ui/Container';
import {Button, Icon} from '@rneui/themed';
import {useAuth} from '../../components/providers/AuthProvider';
import colors from '../../assets/colors';
import PushNotification from 'react-native-push-notification';
import {Alert, Dimensions, Modal, View, TouchableOpacity} from 'react-native';
import {Avatar} from '@rneui/themed';
import {capitalize} from '../../utils/text';
import Text from '../../components/ui/Text';
import {FlatList} from 'react-native-gesture-handler';
import TerminoCondiciones from './components/termino';
import {Notice} from '../../schemas/Notice';
import {fonts, Input} from '@rneui/base';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../../api';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const days = [
  {label: 'Todos Los Dias', value: 'Todos Los Dias'},
  {label: 'Lunes', value: 'Lunes'},
  {label: 'Martes', value: 'Martes'},
  {label: 'Miercoles', value: 'Miercoles'},
  {label: 'Jueves', value: 'Jueves'},
  {label: 'Viernes', value: 'Viernes'},
  {label: 'Sabado', value: 'Sabado'},
  {label: 'Domingo', value: 'Domingo'},
];

const ProfileScreen = () => {
  const [notice, setNotice] = useState();
  const [selected, setSelected] = useState(false);
  const [daySelected, setDaySelected] = useState([]);
  const [date, setDate] = useState(new Date());
  const [recordatorio, setRecordatorio] = useState('');
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [notification, setNotification] = useState(false);

  const {logout, user} = useAuth();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const handleButtomPress = () => {
    const hour = new Date(date);
    const time =
      hour.getHours() + ':' + hour.getMinutes() + ':' + hour.getSeconds();
    Api.Profile.postNewNotice(recordatorio, daySelected, time, user?.id);
    setRepeatingNotification();
    setNotification(!notification);
    searchNotice();
    setDaySelected([]);
  };
  console.log(new Date(date).toLocaleTimeString());

  function setRepeatingNotification() {
    //PushNotification.cancelAllLocalNotifications();
    console.log(date);

    PushNotification.localNotificationSchedule({
      title: capitalize(user?.first_name) + ' acordate de:',
      message: recordatorio,
      date: date, // first trigger in 30 secs
      channelId: 'DemoAppID',
      playSound: true,
      color: colors.primary,
      repeatType: 'day',
      repeatTime: 100, // repeats every 30 seconds (value has to be defined in miliseconds when the repeatType is 'time')
    });
    Alert.alert('Listo!', 'Se Agrego el Aviso Correctamente!');
  }
  const initialName = user?.first_name
    .substring(0, 1)
    .concat(user?.last_name.substring(0, 1))
    .toUpperCase();

  const ListNotification = ({notice}: {notice: Notice}) => {
    <View style={{height: 200, width: 200}}>
      <Text>{notice}</Text>
      <Text>aa</Text>
    </View>;
  };
  console.log(user);

  const searchNotice = async () => {
    const result = await Api.Profile.getNoticeByUser(user?.id);
    console.log(result);
    setNotice(result);
  };

  useEffect(() => {
    searchNotice();
  }, []);

  console.log(new Date(Date.now()));

  return (
    <Container style={{backgroundColor: '#fff'}}>
      <View
        style={{width: WIDTH, position: 'absolute', backgroundColor: '#fff'}}>
        <TouchableOpacity
          onPress={logout}
          style={{alignItems: 'center', alignSelf: 'flex-end', right: 20}}>
          <Icon
            name="exit-outline"
            type="ionicon"
            size={32}
            color={colors.danger}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              size={192}
              rounded
              title={initialName}
              containerStyle={{backgroundColor: 'purple', right: -12.5}}
            />
            <TouchableOpacity
              onPress={() => console.log('TODO:modificar datos del usuario')}
              style={{backgroundColor: '#fff', height: 20}}>
              <Icon name="pencil-outline" type="ionicon" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 24, marginTop: 10}}>
            {capitalize(user!.first_name)} {capitalize(user!.last_name)}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 300,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          width: WIDTH,
          alignItems: 'center',
          alignSelf: 'center',
          elevation: 1,
          height: HEIGHT,
        }}>
        <View
          style={{
            justifyContent: 'center',
            padding: 10,
            elevation: 2,
            width: 380,
          }}>
          <Text
            style={{
              fontFamily: 'Quicksand-Bold',
              alignSelf: 'center',
              fontSize: 20,
            }}>
            Recordatorios
          </Text>
          <FlatList
            data={notice}
            keyExtractor={item => item.notice}
            horizontal
            snapToInterval={10}
            decelerationRate={0}
            scrollEventThrottle={24}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: 200,
                    height: 140,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      elevation: 2,
                      height: 120,
                      backgroundColor: colors.primary,
                      borderRadius: 19,
                      width: 180,
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          color: 'white',
                          alignSelf: 'center',
                          fontFamily: 'Quicksand-Medium',
                          marginTop: 10,
                        }}>
                        {item.notice.toUpperCase()}
                      </Text>
                      <View
                        style={{
                          justifyContent: 'flex-end',
                          flex: 1,
                          marginBottom: 20,
                        }}>
                        <Text style={{color: 'white'}}>
                          Hora: {item.hour.substring(0, 5)}
                        </Text>
                        <Text style={{color: 'white'}}>Dia: {item.day}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setNotification(!notification);
            }}
            style={{
              backgroundColor: colors.secondary,
              padding: 10,
              alignItems: 'center',
              borderRadius: 50,
              width: 40,
              alignSelf: 'flex-end',
              right: 20,
              top: 10,
            }}>
            <Icon name="add-outline" type="ionicon" color={'white'} size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            animationType="fade"
            style={{flex: 1}}
            visible={notification}
            transparent>
            <View style={{backgroundColor: '#00000077', flex: 1}}>
              <View
                style={{
                  backgroundColor: '#fff',
                  height: 340,
                  marginTop: 250,
                  width: 350,
                  alignSelf: 'center',
                  borderRadius: 10,
                }}>
                <View>
                  <TouchableOpacity
                    onPress={() => setNotification(!notification)}
                    style={{
                      alignSelf: 'flex-end',
                      right: 10,
                      top: 10,
                      position: 'absolute',
                    }}>
                    <Icon
                      name="close-circle-outline"
                      type="ionicon"
                      color={'red'}
                      size={30}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{fontSize: 20, alignSelf: 'center', marginTop: 15}}>
                    Nuevo Recordatorio
                  </Text>
                  <Input
                    placeholder="Ingrese el Nombre de Recordatorio"
                    onChangeText={value => setRecordatorio(value)}
                    inputStyle={{width: 10}}
                    containerStyle={{
                      width: 270,
                      alignSelf: 'center',
                      marginTop: 40,
                    }}
                    labelStyle={{fontSize: 20}}
                    style={{fontSize: 15, alignContent: 'center'}}></Input>
                </View>
                <Button
                  onPress={() => setShow(!show)}
                  color={colors.secondary}
                  buttonStyle={{width: 150, alignSelf: 'center'}}>
                  Hora del Aviso
                </Button>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
                <DropDownPicker
                  open={selected}
                  value={daySelected}
                  setValue={setDaySelected}
                  items={days}
                  setOpen={setSelected}
                  multiple={true}
                  mode="BADGE"
                  badgeDotColors={colors.secondary}
                  placeholder={'Selecciones los dias de Recordatorio'}
                  style={{width: 300, alignSelf: 'center', marginTop: 20}}
                  dropDownContainerStyle={{
                    marginTop: 20,
                    width: 300,
                    alignSelf: 'center',
                  }}
                />
                <View style={{marginTop: 30, flex: 1, bottom: 10}}>
                  <Button
                    buttonStyle={{width: 150, alignSelf: 'center'}}
                    color={colors.secondary}
                    onPress={() => handleButtomPress()}>
                    Crear Notificacion
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{flexDirection: 'row', marginTop: 70}}>
          <Text>Ver </Text>
          <TouchableOpacity onPress={() => setModal(!modal)}>
            <Text style={{color: colors.blue}}>Términos y Condiciones</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          style={{flex: 1}}
          visible={modal}
          transparent>
          <View style={{backgroundColor: '#00000077', flex: 1}}>
            <View
              style={{
                width: 350,
                padding: 10,
                margin: 10,
                alignSelf: 'center',
                backgroundColor: '#fff',
                borderRadius: 3,
                borderWidth: 2,
                height: HEIGHT / 1.05,
              }}>
              <View
                style={{
                  width: 40,
                  alignContent: 'center',
                  alignSelf: 'flex-end',
                }}>
                <Button
                  style={{alignSelf: 'flex-end', height: 10}}
                  onPressOut={() => setModal(!modal)}
                  title="Salir"
                  color={'#FFf'}>
                  <Icon name="close-circle-outline" type="ionicon" size={20} />
                </Button>
              </View>
              <TerminoCondiciones></TerminoCondiciones>
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
};

export default ProfileScreen;
