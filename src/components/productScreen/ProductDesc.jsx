import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductDesc() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 10 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Y means youth , Y means You স্কুল, কলেজ, বিশ্ববিদ্যালয়ের কিংবা অফিসের
        কুলডুট ভাইদের জন্য এটার বিকল্প নেই। যেমন ইউনিক energetic, refreshing
        ঘ্রান তেমনি লং লাস্টিং আলহামদুলিল্লাহ। বর্তমান সময়ের টপ লিস্টে থাকা
        সুগন্ধি । রিসেন্ট রিসার্চে আমেরিকা ইউরোপে সবচে বেশি ব্যবহৃত ১০টি
        সুগন্ধির মাঝে এটি জায়গা করে নিয়েছে। ফ্রেশ আর বোল্ড স্মেলের এমন কম্বিনেশন{" "}
        <br />
        মুহুর্তেই আপনাকে ভাবনার জগতে হারিয়ে নিয়ে যাবে। আশপাশের সবার মধ্যমণি
        বানায়ে দিতে এই সুগন্ধির জুড়ি মেলা ভার। সব আবহাওয়ায় ব্যবহার উপযোগী তুমুল
        জনপ্রিয় এক সুগন্ধি এটি,তাই দেরি না করে নিয়ে নিন জলদি 😇💖 আমাদের কাছে
        পাবেন এর এলকোহল ফ্রি ভার্সন,তাই যে কেউ ব্যবহারে আগ্রহী হলে জলদি
        নিশ্চিন্তে নিয়ে নিন ইনশাআল্লাহ 😇 <br />
        <br />
        🛑শীর্ষ নোট: আপেল, আদা এবং বার্গামট;
        <br />
        <br />
        🛑মাঝের নোট: সেজ, জুনিপার বেরি <br />
        <br />
        🛑বেস নোট: Amberwood, Tonka Bean, Cedar, Vetiver এবং Olibanum <br />
        <br />
        📌📌সঠিকভাবে ব্যবহার করতে পারলে ১/২দিন কাপড়ে থাকবে ইনশাআল্লাহ। <br />
        <br />
        ঢাকার মধ্য ডেলিভারি চার্জ ৬০ টাকা <br />
        ঢাকার বাহিরে ডেলিভারি চার্জ ১০০ টাকা
        <br />
        অর্ডার করতে ফোন করুন: 01903-000176
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}
