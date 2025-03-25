"use client"; 
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'font-awesome/css/font-awesome.min.css';
import styles from "./page.module.css";
import Layout from "@/components/layout";
import SearchBar from "../components/searchBar"
import Tascks from "@/components/tascks";

export default function Home() {
  return (
    <Layout>
      <div className="bg-custom2 p-5 text-center custom-container ">
      <div className="row">
    
    <div className="col-md-4">
      <div className="border p-3">
        <h4>Left Container</h4>
        <p>This is the left container, which is smaller.</p>
      </div>
    </div>
    
    <div className="col-md-8">
      <div className=" p-3">

    <SearchBar/>
    <Tascks/>
      </div>
      
      <div className="">
        
      </div>
    </div>
  </div>
     
      <style jsx global>{`
        .bg-custom2{
          background-color: #FAF7F2 !important;
         
        }
          .custom-container {
         border-radius: 10px; 

}

      `}</style>
      </div>
     
    </Layout>
  );
}
