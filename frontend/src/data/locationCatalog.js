const countryNames = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica','Croatia','Cuba','Cyprus','Czechia','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
];

export const locationCatalog = [
  ...countryNames.map((name) => ({ type: 'Country', name })),
  { type: 'State', name: 'Andhra Pradesh', country: 'India', region: 'South India' },
  { type: 'State', name: 'Telangana', country: 'India', region: 'South India' },
  { type: 'State', name: 'Tamil Nadu', country: 'India', region: 'South India' },
  { type: 'State', name: 'Maharashtra', country: 'India', region: 'West India' },
  { type: 'State', name: 'Delhi', country: 'India', region: 'North India' },
  { type: 'City', name: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India' },
  { type: 'City', name: 'Hyderabad', state: 'Telangana', country: 'India' },
  { type: 'City', name: 'Chennai', state: 'Tamil Nadu', country: 'India' },
  { type: 'City', name: 'Mumbai', state: 'Maharashtra', country: 'India' },
  { type: 'City', name: 'Delhi', state: 'Delhi', country: 'India' },
  { type: 'Village', name: 'Gajuwaka', city: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India' },
  { type: 'Village', name: 'Rushikonda', city: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India' },
  { type: 'Village', name: 'Madhurawada', city: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India' },
  { type: 'Village', name: 'Kukatpally', city: 'Hyderabad', state: 'Telangana', country: 'India' },
  { type: 'Village', name: 'Adyar', city: 'Chennai', state: 'Tamil Nadu', country: 'India' },
  { type: 'City', name: 'London', country: 'United Kingdom' },
  { type: 'City', name: 'New York', country: 'United States' },
  { type: 'City', name: 'Dubai', country: 'United Arab Emirates' },
  { type: 'City', name: 'Sydney', country: 'Australia' },
];

export const supportedLanguages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
];
