import React from "react";
import { useState } from "react";
import classes from "./Dashboard.module.css";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react"

function Dashboard() {
  return (
    <>
      <Head title="Dashboard" />
      <div className={classes.DashboardContainer}>
        <div className={classes.Card}>
          <p>Today's Gym Code</p>
          <h3>123</h3>
        </div>
        <div className={classes.Card}>
          <p>Total Revenue</p>
          <h3>$123213</h3>
        </div>
        <div className={classes.Card}>
          <p>Current Active Members</p>
          <h3>123</h3>
        </div>
        <div className={classes.Card}>
          <p>Total Trainers</p>
          <h3>123</h3>
        </div>
      </div>
    </>

  );
}

// This tells Inertia to wrap Dashboard in AppLayout
Dashboard.layout = page => <AppLayout>{page}</AppLayout>

export default Dashboard;
