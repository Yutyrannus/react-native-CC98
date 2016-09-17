import React,{
	Component
} from 'react';
import {
  View,
  StatusBar,
	Text
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Navigation from './layouts/Navigation';
import moment from 'moment'

moment.locale('zh-CN', {
    calendar : {
        lastDay : '[昨天]',
        sameDay : '[今天]',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    },
    relativeTime : {
      future: "in %s",
      past:   "%s前",
      s:  "%d秒",
      m:  "一分钟",
      mm: "%d分钟",
      h:  "一小时",
      hh: "%d小时",
      d:  "一天",
      dd: "%d天",
      M:  "一月",
      MM: "%d月",
      y:  "一年",
      yy: "%d年"
    }
});

//const store = configureStore();


class App extends Component {
	render() {
		return (
			//<Provider>
				<Navigation/>
			//</Provider>
		);
	}
}


export default App;
