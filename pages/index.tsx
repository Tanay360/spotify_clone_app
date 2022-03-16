import { AppBar, Toolbar, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import MusicPlayer from "../components/Music";
import SearchField from "../components/SearchField";
import SearchItems from "../components/SearchItems";
import SearchResult from "../components/SearchResults";

const Search: NextPage = () => {
    return (
      <>
      <Head>
        <title>Musicify</title>
      </Head>
        <div className="content h-full">
          <AppBar position="sticky" >
            <Toolbar>
              <img src="/icon.png" width={30} height={30} alt=""/>
              <Typography className="ml-2" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Musicify
              </Typography>
            </Toolbar>
          </AppBar>
          <Content/>
        </div>
      </>
      
    )
}

const Content = () => {
    const [items, changeItems] = useState<SearchResult[]>([])
    const [currentMusic, changeMusic] = useState<SearchResult | null>(null);
    return (
        <div className="bg-zinc-900 text-white p-8 min-h-screen">
            <SearchField changeItems={changeItems}/>
            <SearchItems items={items} changeMusic={changeMusic}/>
            <MusicPlayer musicDetails={currentMusic}/>
        </div>
    )    
}

export default Search