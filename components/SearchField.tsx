import { Backdrop, CircularProgress, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/ClearRounded';
import SearchResult from "./SearchResults";

const SearchField = ({changeItems}: { changeItems: React.Dispatch<React.SetStateAction<SearchResult[]>> }) => {
    const [searchValue, changeSearchValue] = useState("")
    const [overlayOpen, setOverlayOpen] = useState(false);
    const closeOverlay = () => setOverlayOpen(false);
    const openOverlay = () => setOverlayOpen(true);
    return (
        <div>
            <TextField 
                id="filled-basic" 
                label="Search"
                value={searchValue} 
                placeholder="Search your favourite songs"
                variant="filled" 
                className="w-full text-center"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title="Clear Search">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        changeSearchValue("")
                                        changeItems([])
                                    }}
                                    edge="end"
                                >
                                <ClearIcon/>
                                </IconButton>    
                            </Tooltip>
                            
                        </InputAdornment>
                      )
                }}
                onKeyDown={(e) => {
                    onEnterClicked(e, handleSearch(searchValue, changeItems, closeOverlay, openOverlay))
                }}
                onSubmit={() => {
                    console.log("Submitted line 46")
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    changeSearchValue(event.target.value)
                }}
            />
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={overlayOpen}
              onClick={closeOverlay}
            >
              <CircularProgress />
            </Backdrop>
        </div>
        
    )
}

const handleSearch = (search: string, changeItems: React.Dispatch<React.SetStateAction<SearchResult[]>>, closeOverlay: () => void, openOverlay: () => void) => async () => {
    const toSearch = search.split(' ').join('-')
    if (toSearch.length == 0) {
        return;
    }
    openOverlay()
    const items = await (await fetch(`https://warm-beyond-85692.herokuapp.com/search/${toSearch}`)).json()
    const content = items.content as any[]
    const results: SearchResult[] = []
    content.forEach((item) => {
        if (item.type == 'video')  {
            results.push({
                name: item.name as string,
                videoId: item.videoId as string,
                thumbnailUrl: getThumbnail(item),
                author: item.author as string
            })
        } else if (item.type == 'song') {
            results.push({
                name: item.name as string,
                videoId: item.videoId as string,
                thumbnailUrl: getThumbnail(item),
                author: item.artist.name as string
            })
        }
    })
    closeOverlay()
    changeItems(results)
    console.log(results)
}

const onEnterClicked = (e: React.KeyboardEvent<HTMLDivElement>, block: () => void) => {
    if (!e.key) {
        if (e.keyCode == 13) {
            block()    
        }
    } else {
        if (e.key === 'Enter') {
            block()
        }
    }
}

const getThumbnail = (item: any): string => {
    const thumbnails = item.thumbnails
    if (thumbnails instanceof Array) {
        return thumbnails[thumbnails.length - 1].url;
    } else {
        return thumbnails.url;
    }
}

export default SearchField;