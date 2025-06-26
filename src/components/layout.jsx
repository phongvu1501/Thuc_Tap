import { Children } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductList from "./ProdcutList";


function Layout() {

    return (
        <div className="container">
            <Header />
            <div className="main-section">
                <Sidebar />
                <div>
                    <ProductList />
                </div>

            </div>
        </div>


    );

}

export default Layout;