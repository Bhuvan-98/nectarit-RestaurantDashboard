
import { Gauge,gaugeClasses } from '@mui/x-charts/Gauge';
import '../pages/Dashboard/Widgets/style.css'


const GaugeChart = (props) => {

    const gaugeSettings = {
        width: 200,
        height: 200,
      };

    return <>
        <div className='pie-div mar-lr-20 gauge-char'>
            <div className='pie-head'>
              <span className='pie-head-name'>{props.label}</span>
            </div>
            <Gauge
                {...gaugeSettings}
                value={props.value}
                valueMax={props.valueMax}
                valueMin={props.valueMin}
                cornerRadius="70%"
                sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#52b202',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                },
                })}
            />
            </div>
    </>
}

export default GaugeChart;