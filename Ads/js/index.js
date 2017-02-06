
// Reactjs status bar
var Status = React.createClass({
  render: function(){
    var statusBar = {
      backgroundColor: '#EF5F3C',
      width: '0',
      height: '10px',
      fontSize: '8px'
    };
    
    //.26 = total width/ needed amount
    var totalWidth = this.props.total * (.26);
    statusBar.width = (totalWidth)+'px'; 
    return (
    	<div style={statusBar}></div> 
    );
    
  }
});
// component for top grey comment box
var Comment = React.createClass({
  
  render: function() {
    var downArrow = {
      width: '0', 
      height: '0', 
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      borderTop: '20px solid #424242'
/*      float: 'right',
      marginRight: '20px'*/
    };
    //.26 = total width/ needed amount
    var totalWidth = this.props.total * (.26);
    downArrow.marginLeft = (totalWidth - 15)+'px';
    
    this.props.needed = parseInt(this.props.needed,10);
    this.props.test = "Testing value";
    return (
      <div>
   			$ {this.props.needed} still needed for this project
      	<div style={downArrow}></div>
      </div>
      
    );
  }
});

var Challenge = React.createClass({
  getInitialState: function() {
    return {donated: '50', total: 0, donors: 0, needed: 1000};
  },
  handleChange: function(e) {
   	this.setState({donated: e.target.value});
    console.log(this.state.donated);
  },
  handleSubmit: function(e){
    
    e.preventDefault();
    
    var nextItems = parseInt(this.state.donated, 10);
    
    if(isNaN(nextItems)){
      alert("Invalid donation, please use numeric input")
    }
    else{
      var donors = this.state.donors + 1;
      var nextText = this.state.total + parseInt(this.state.donated, 10);
      var needed = this.state.needed - nextItems;
      this.setState({donated: nextItems, total: nextText,donors: donors, needed: needed }); 
    }
  },
  
  render: function() {
    var orange = {
      color: '#EF5F3C',
      fontWeight: 'bold'
    };
    var grey = {
      color: '#777'
    };
    var inputStyle = {
      /*float: 'left',*/
      display: "inline-block",
      border: '2px solid #eaeaea',
      borderRadius: '3px',
      marginLeft: '20px',
      marginBottom: '20px',
      width: '100px',
      height: '40px',
      paddingLeft: '5px',
      
    };
    var give = {
      backgroundColor: '#1CBC2C',
      color: 'white',
      width: '100px',
      height: '40px',
      float: 'right',
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '0',
      borderRadius: '3px',
      fontSize: '14px',
      textAlign: 'center',
      paddingTop: '0px',
      boxShadow: 'none',
      border: 'none'
    };
    var blue = {
      color: '#20A1D4',
      fontStyle: 'italic',
      fontSize: '12px',
      display: 'inline-block',
      marginLeft: '20px',
      marginBottom: '50px'
    };
    var statusBarContainer = {
      borderBottom: '2px solid #eaeaea',
      borderTop: '2px solid #eaeaea'
    };
    var commentStyle = {
      height: '50px',
      width: '260px',
      backgroundColor: '#424242',
      margin: '0 auto',
      marginBottom: '10px',
      color: 'white',
      paddingTop: '15px',
      textAlign: 'center'
    };
    var box = {
      /*boxShadow: '0px 0px 4px 2px #eaeaea',*/
      color: '#777',
      border: '2px solid ##eaeaea'
    };
    
    return (
      <div>
      	<div style={commentStyle} >
          <Comment needed={this.state.needed} total={this.state.total}/> 
        </div>
      	<div style={statusBarContainer}>
      		<Status total={this.state.total} needed={this.state.needed} boxWidth={commentStyle.width}/> 
      	</div>
      	<div style={box}>
          <p><span style={orange}>Only 3 days left</span> to fund this project</p>
          <p>
            Join the <strong>{this.state.donors}</strong> other donors who have already supported this project.Every dollar helps.
          </p>
          <form onSubmit={this.handleSubmit}>
            <div style={inputStyle}>
              $<input onChange={this.handleChange} value={this.state.donated}></input>
            </div>
            <a href='#' type='submit'>
              <button style={give}>
                Give Now
              </button>
            </a>
          </form>
          <a href="#">
            <div style={blue}>Why give $50?</div>
          </a>
      </div>
      </div>
    );
  }
});

/*React.render(<Instructions text="Recreate this using React.js (JSX) &amp; CSS"            imageSrc="https://s3.amazonaws.com/f.cl.ly/items/2z3C3Z0L2Q0R282p1V0z/Image%202014-12-19%20at%2010.07.09%20AM.png" imageWidth="303" />, document.querySelector(".instructions"))*/

React.render(<Challenge color='#EF5F3C' /> , document.querySelector(".challenge"))
