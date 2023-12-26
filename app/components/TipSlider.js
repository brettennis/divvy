import { 
    View, 
    Text, 
    StyleSheet, 
} from 'react-native';
import { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';

export default function TipSlider({ tip, setTip }) {

    const progress = useSharedValue(20);
    const min = useSharedValue(0);
    const max = useSharedValue(40);

    const [ displayTip, setDisplayTip ] = useState(tip);

    return (
        <View style={styles.container}>
            <View style={styles.legend}>
                <Text style={styles.legendText}>
                    Tipping {displayTip}%
                </Text>
            </View>
            <Slider
                style={styles.slider}
                containerStyle={styles.sliderContainer}
                renderBubble={()=>{}}
                thumbWidth={25}
                sliderHeight={10}
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                onValueChange={(value)=>setDisplayTip(value)}
                onSlidingComplete={(value)=>setTip(value)}
                theme={{
                    maximumTrackTintColor: theme.taupe,
                    minimumTrackTintColor: theme.purplelight,
                    bubbleBackgroundColor: theme.black,
                }}
                step={40}
                snapToStep={true}
                markWidth={18}
                renderMark={({ index }) => {
                    if (index % 5 === 0) return (
                        <View style={styles.mark}>
                            <Text style={styles.markText}>
                                {index}
                            </Text>
                        </View>
                    )
                }}
                renderThumb={() =>
                    <View style={styles.thumb}/>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    legend: {
        paddingLeft: 15,
        paddingTop: 15,
    },
    legendText: {
        fontSize: 23,
    },
    slider: {
        marginRight: 30,
        marginLeft: 30,
        marginTop: 25,
        marginBottom: 40,
    },
    sliderContainer: {

    },
    mark: {
        top: 25,
        // textAlign: 'center',
    },
    markText: {
        color: theme.black,
        // textAlign: 'center',
    },
    thumb: {
        height: 25,
        width: 25,
        left: 3,
        backgroundColor: theme.purple,
        borderRadius: '100%',
    }
});