import Head from 'next/head';
import React from 'react';
import Header from './Header';



const Layout = ({children}) => {
    
    return ( 
        <>
        <Head>
            <title>Blog Konecta</title>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"/>
        </Head>

        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto">
                <Header/>
                <main className="mt-1">
                    {children}
                </main>
            </div>
        </div>
        </>
    );
}
 
export default Layout;