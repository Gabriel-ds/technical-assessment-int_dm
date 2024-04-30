import axios from 'axios';

class GeoLib {
    async getAddressFromCoordinates(coordinates: number[]) {
        try {
            let response;
            if (Array.isArray(coordinates)) {
                response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            } else {
                throw new Error('Invalid coordinates format');
            }

            if (response?.data?.display_name) {
                return `${response.data.display_name}`;
            } else {
                throw new Error('Address not found');
            }
        } catch (error) {
            throw new Error('Error to get address');
        }
    }

    async getCoordinatesFromAddress(address: string) {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(address)}&format=jsonv2&limit=1`, {
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });

            if (Array.isArray(response.data) && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                return [parseFloat(lat), parseFloat(lon)];
            } else {
                throw new Error('Coordinates not found');
            }
        } catch (error) {
            console.error('Error getting coordinates:', error);
            throw new Error('Error to get coordinates');
        }
    }
}

export default new GeoLib();