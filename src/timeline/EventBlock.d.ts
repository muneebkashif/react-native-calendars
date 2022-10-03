/// <reference types="react" />
import { TextStyle, ViewStyle } from 'react-native';
export interface Event {
    id?: string;
    start: string;
    end: string;
    title: string;
    summary?: string;
    color?: string;
    city?: string;
    dateTime?:string;
    pickupLocation?:string;
    status?:string;
    studentId?:string;
    studentLessonNumber?:string;
    studentName?:string;
    totalLessons?:string;
    latitude?:string;
    longitude?:string;
    notes?:string;
    duration?: number;
    eventId?: string;
    locationPin?: string;
    type?: string;
    lessonType?: string; 
}
export interface PackedEvent extends Event {
    index: number;
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface EventBlockProps {
    index: number;
    event: PackedEvent;
    onPress: (eventIndex: number) => void;
    renderEvent?: (event: PackedEvent) => JSX.Element;
    format24h?: boolean;
    styles: {
        [key: string]: ViewStyle | TextStyle;
    };
}
declare const EventBlock: (props: EventBlockProps) => JSX.Element;
export default EventBlock;
