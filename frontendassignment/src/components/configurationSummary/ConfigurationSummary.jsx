
// Library
import { useEffect, useState } from "react";

// Components
import SummaryBox from "./components/summaryBox";

// Constants
import { CONFIGURATION_SUMMARY } from "./configurationSummary.constants";

// styles
import './styles.css'

function ConfigurationSummary() {

  const [summaryDetails, setSummaryDetails] = useState({});

  useEffect(()=> {
    setSummaryDetails((item) => ({error: 11, designIssues: 43,pendingVerifications: 4}))
  }, [])

  const getSummarry = () =>  {
    const configurationSummary = CONFIGURATION_SUMMARY.map((summary) => (<SummaryBox className={summary.className} key={summary.id} value={summaryDetails[summary.id]} label={summary.label}/>))
    return configurationSummary
  }

  return <div className="summary">{getSummarry()}</div>
}

export default ConfigurationSummary;