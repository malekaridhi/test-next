"use client";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import styles from "./page.module.css";
import Layout from "@/components/layout";
import SearchBar from "../components/searchBar"
import Tascks from "@/components/tascks";
import Container from "@/components/botonCont";
import Calendar from "@/components/calender";
import { getAllTaches } from "@/services/tasck.js"
import { useEffect, useState } from "react";
export default function Home() {
  const [taches, setTaches] = useState([]);
  const [reload, setReload] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTaches();
      if (data) {
        setTaches(data);
      }
    };

    fetchData();
  }, [reload]);
  const pendingTasks = taches.filter(task => task?.status === "pending");

  const completedTasks = taches.filter(task => task?.status === "complete");
  console.log("tasck", taches, completedTasks);
  return (
    <Layout>
      <div className="bg-custom2 p-5 text-center custom-container ">

        <div className="row">

          <div className="col-md-4">
            <div className=" p-3">

              <Calendar taches={taches} />
            </div>
          </div>

          <div className="col-md-8">

            <div className=" p-3">

              <SearchBar
                reload={setReload} />
              <Tascks
                taches={taches}
                reload={setReload}
              />
            </div>

            <div className="">

            </div>
          </div>
        </div>
        <div className="l mt-5">
          <Container
            Tascks={taches?.length}
            complete={completedTasks?.length}
            pending={pendingTasks?.length}
          />
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
