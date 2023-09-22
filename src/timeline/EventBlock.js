import XDate from 'xdate';
import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
const TEXT_LINE_HEIGHT = 17;
const EVENT_DEFAULT_COLOR = '#add8e6';
const EventBlock = props => {
  const {index, event, renderEvent, onPress, format24h, styles} = props;
  // Fixing the number of lines for the event title makes this calculation easier.
  // However it would make sense to overflow the title to a new line if needed
  const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
  const formatTime = format24h ? 'HH:mm' : 'hh:mm TT';
  const formaDate = 'MMMM dS, yyyy';
  const eventStyle = useMemo(() => {
    return {
      left: event.left,
      height: event.height,
      width: event.width,
      top: event.top,
      backgroundColor: event.color ? event.color : EVENT_DEFAULT_COLOR,
      borderLeftWidth: 5,
      borderWidth: 0,
      borderColor:
        event.type == 'event'
          ? '#FFC600'
          : event.type == 'private lesson'
          ? '#FFC600'
          : event.type == 'lesson'
          ? '#36A0CD'
          : event.type == 'road test'
          ? '#FF6B48'
          : event.type == 'outOfOffice'
          ? '#C3907F'
          : '#fff'
    };
  }, [event]);
  const _onPress = useCallback(() => {
    onPress(index);
  }, [index, onPress]);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={_onPress}
      style={[
        styles.event,
        eventStyle,
        {
          marginLeft: 12,
          height: event?.height - 20,
          marginTop: 12,
          // alignItems: "center",
          justifyContent: 'center'
        }
      ]}
    >
      {renderEvent ? (
        renderEvent(event)
      ) : (
        <View>
          {event.type == 'outOfOffice' && (
            <View style={{marginTop: -2, width: '95%', marginLeft: 5, height: '100%', justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>
                    {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
                  </Text>
                </View>
              </View>
              <Text style={{fontWeight: 'bold', marginVertical: 5, color: '#3F4041'}}>Out-of-Office</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>
                    {new XDate(event.end).toString(formaDate)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {event.type == 'event' && (
            <View style={{marginTop: -2, width: '95%', marginLeft: 5, height: '100%', justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>
                    {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
                  </Text>
                </View>
              </View>
              <Text style={{fontWeight: 'bold', marginVertical: 5, color: '#3F4041'}}>
                {event.studentName ?? event?.eventName}
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>Event</Text>
                </View>
              </View>
            </View>
          )}

          {event.type == 'private lesson' && (
            <View style={{marginTop: -2, width: '95%', marginLeft: 5, height: '100%', justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>
                    {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}></View>
              </View>

              <Text style={{fontWeight: 'bold', marginVertical: 5, color: '#3F4041'}}>
                {event.studentName ?? event?.eventName}
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>Event</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}></View>
              </View>
            </View>
          )}
          {event.type == 'lesson' && (
            <View style={{marginTop: -2, width: '95%', marginLeft: 5, height: '100%', justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>
                    {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('./assets/book.png')}
                    style={{height: 15, width: 15, marginRight: 3, tintColor: '#3F4041'}}
                    resizeMode="contain"
                  />

                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>
                    Lessons {event.studentLessonNumber}/{event.totalLessons}
                  </Text>
                </View>
              </View>

              <Text style={{fontWeight: 'bold', marginVertical: 5, color: '#3F4041'}}>
                {event.studentName ?? event?.eventName}
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>Kruzee Lesson</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('./assets/location.png')}
                    style={{height: 15, width: 15, marginRight: 3, tintColor: '#3F4041'}}
                    resizeMode="contain"
                  />
                  <Text numberOfLines={1} style={{fontWeight: '300', color: '#3F4041', fontSize: 12, maxWidth: 100}}>
                    {event?.pickupLocation}
                  </Text>
                </View>
              </View>
            </View>
          )}
          {event.type == 'road test' && (
            <View style={{marginTop: -2, width: '95%', marginLeft: 5, height: '100%', justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>
                    {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
                  </Text>
                </View>
              </View>

              <Text style={{fontWeight: 'bold', marginVertical: 5, color: '#3F4041'}}>
                {event.studentName ?? event?.eventName}
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontWeight: '300', color: '#3F4041', fontSize: 12}}>Kruzee Road Test - G2</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('./assets/location.png')}
                    style={{height: 15, width: 15, marginRight: 3, tintColor: '#3F4041'}}
                    resizeMode="contain"
                  />
                  <Text numberOfLines={1} style={{fontWeight: '300', color: '#3F4041', fontSize: 12, maxWidth: 100}}>
                    {event?.pickupLocation}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* {numberOfLines > 2 ? (
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                    <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                        {event.studentName?? event?.eventName}
                    </Text>
                    <Text style={styles.eventTimes} numberOfLines={1}>
                        {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
                    </Text>
                </View>
            ) : null} */}
          {/* {
                 event.type != "event" && (
                     <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%", marginTop: 5 }}>
                     <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5}}>
                         <Image source={event.locationPin} style={{height: 16, width: 16, tintColor: "gray", marginTop: 5}} />
                             <Text style={{ ...styles.eventTimes, fontSize: 12, marginLeft: 5, width: "50%" }}
                             numberOfLines={1}
                             >   
                             {event.pickupLocation}
                         </Text>
                     </View>
                     <View style={{ flexDirection: "row", alignItems: "center" }}>
                     <Image source={event.book} style={{height: 16, width: 16, tintColor: "gray", marginTop: 5}} />
    
                         <Text style={{...styles.eventTimes, fontSize: 14, marginLeft: 5}}>
                            Lessons {event.studentLessonNumber}/{event.totalLessons}
                         </Text>
                     </View>
                 </View>
    
                 )
             } */}
        </View>
      )}
    </TouchableOpacity>
  );
};
export default EventBlock;
