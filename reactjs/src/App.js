import AppRouter from "routes";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "utils/store";

const App = () => {
	return (
		<Provider store={store}>
			<Toaster position='top-right' richColors />
			<AppRouter />
		</Provider>
	);
};

export default App;
