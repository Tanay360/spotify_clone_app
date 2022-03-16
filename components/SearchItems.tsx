import { Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from "@mui/material"
import SearchResult from './SearchResults';

const SearchItems = ({items, changeMusic}: { items: SearchResult[], changeMusic: React.Dispatch<React.SetStateAction<SearchResult | null>>}) => {
    return (
        <List className="mt-4 mb-8 flex flex-col">
            {items.map((item: SearchResult) => {
                return (
                    <div key={item.videoId}>
                        <Button className="w-full" onClick={() => changeMusic(item)}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        {/* eslint-disable-next-line @next/next/no-img-element*/}
                                        <img src={item.thumbnailUrl} alt={item.name}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} style={{
                                    textTransform: 'none'
                                }}/>
                            </ListItem>
                        </Button>
                        <Divider/>
                    </div>
                    
                )
            })}
        </List>

    )
}

export default SearchItems;