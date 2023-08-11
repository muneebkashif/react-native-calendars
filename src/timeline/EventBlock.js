import XDate from 'xdate';
import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
const TEXT_LINE_HEIGHT = 17;
const EVENT_DEFAULT_COLOR = '#add8e6';
const EventBlock = (props) => {
    const { index, event, renderEvent, onPress, format24h, styles } = props;
    // Fixing the number of lines for the event title makes this calculation easier.
    // However it would make sense to overflow the title to a new line if needed
    const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
    const formatTime = format24h ? 'HH:mm' : 'hh:mm tt';
    const eventStyle = useMemo(() => {
        return {
            left: event.left,
            height: event.height,
            width: event.width,
            top: event.top,
            backgroundColor: event.color ? event.color : EVENT_DEFAULT_COLOR
        };
    }, [event]);
    const _onPress = useCallback(() => {
        onPress(index);
    }, [index, onPress]);
    return (<TouchableOpacity activeOpacity={0.9} onPress={_onPress} style={[styles.event, eventStyle, {
        marginLeft: 12, 
        height: event?.height -20,
        marginTop: 12,
        // alignItems: "center",
        justifyContent: "center"
    }]}>

    
        {renderEvent ? (renderEvent(event)) : (<View>
          {/* <Text numberOfLines={1} style={styles.eventTitle}>
            {event.title || 'Event'}
          </Text>
          {numberOfLines > 1 ? (<Text numberOfLines={numberOfLines - 1} style={[styles.eventSummary]}>
              {event.summary || ' '}
            </Text>) : null} */}
          {/* {numberOfLines > 2 ? (<Text style={styles.eventTimes} numberOfLines={1}>
              {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
            </Text>) : null} */}


            
            {numberOfLines > 2 ? (
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                    <Text style={{ fontWeight: "bold", marginLeft: 5 }}>
                        {event.studentName?? event?.eventName}
                    </Text>
                    <Text style={styles.eventTimes} numberOfLines={1}>
                        {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
                    </Text>
                </View>
            ) : null}
            {
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
            }
           
          
        </View>)}
    </TouchableOpacity>);
};
export default EventBlock;
