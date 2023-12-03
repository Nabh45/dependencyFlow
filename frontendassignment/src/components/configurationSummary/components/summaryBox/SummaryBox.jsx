function SummaryBox(props) {
    const {label, value, className} = props;

    return <div className={`summary-box ${className}`}>
        <h2>{value}</h2>
        <div>{label}</div>
        </div>
}

export default SummaryBox