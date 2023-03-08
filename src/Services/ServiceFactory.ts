class ServiceFactory {
	static get error(): (error: unknown, options?: {saga: string}) => void {
		return (error: unknown, options?: {saga: string}) => {
			console.log(error, options);
		};
	}
}

export default ServiceFactory;
