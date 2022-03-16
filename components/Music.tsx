import SearchResult from './SearchResults';
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

const MusicPlayer = ({musicDetails}: {musicDetails: SearchResult | null}) => {
    if (musicDetails == null) {
        return (
            <div></div>
        )
    }

    const playerStyles = makeStyles(() => {
        return {
            root: {
                position: 'fixed',
                bottom: 10,
                left: 5   
            }
        }
    })

    const muiTheme  = createTheme({
        palette: {
            type: 'dark',
            background: {
                paper: '#000'
            }
        }
    })
            

    return (
        <ThemeProvider theme={muiTheme}>
            <AudioPlayer src={`https://warm-beyond-85692.herokuapp.com/download/${musicDetails.videoId}`} useStyles={playerStyles}/>
        </ThemeProvider>
    )
}

export default MusicPlayer;