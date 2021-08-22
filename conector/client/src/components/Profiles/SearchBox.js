import React from 'react';


const SearchBox=({ searchChange })=>{
    return(

        <div className='pa2'>
            <input
            className='pa3 ba b--green bg-lightest-blue'
             type="search"
             placeholder='search by name'
             onChange={searchChange}/>
        </div>
    );
}

// <div className='tc'>
//
// </div>

export default SearchBox;
