export interface RoomConfig {
	id: string;
	floor: number;
	ical: string;
	building: string;
}

export type SerializedRooms = {
	[roomID: string]: RoomConfig;
};

export function buildCalendarUrl(roomID: string, icalsecurise: string): string {
	const version = '2023.0.7.0';
	const param = '643d5b312e2e36325d2666683d3126663d3130';
	return `https://planning-2324.isep.fr/Telechargements/ical/Edt_${roomID}.ics?version=${version}&icalsecurise=${icalsecurise}&param=${param}`;
}

export const ROOM_CONFIG: SerializedRooms = {
	N48A: {
		id: 'N48A',
		floor: 4,
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N48A.ics?version=2023.0.7.0&icalsecurise=FDBFF8196C89D481EC9B8A6E15A1493F624E4A7090D64124C6E9E8C21A4E2FF6AE6D78013583350CC683D550FB9C1BCB&param=643d5b312e2e36325d2666683d3126663d3130',
		building: 'NDC'
	},
	N48B: {
		id: 'N48B',
		floor: 4,
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N48B.ics?version=2023.0.7.0&icalsecurise=726215D1801ED3365370D5995A5865F6A973A5405ADDD13936E00E96142AD117A0FF216C1BCE26649805FE5AD8770C4C&param=643d5b312e2e36325d2666683d3126663d3130',
		building: 'NDC'
	},
	N43: {
		id: 'N43',
		building: 'NDC',
		floor: 4,
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N43.ics?version=2023.0.7.0&icalsecurise=2048944A9A52374F40FF5F267AB11DE8B83E30E5722736074EA0BEC3BCB03FF9653B40E5C498F5712B926F990407A1FE&param=643d5b312e2e36325d2666683d3126663d3130'
	},
	N44: {
		id: 'N44',
		building: 'NDC',
		floor: 4,
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N44.ics?version=2023.0.7.0&icalsecurise=FDBFF8196C89D481EC9B8A6E15A1493FA20F7865EAF1E1F1A2BC2659835C3B51D34C654A746A57C0D099B941AEB7BFF5&param=643d5b312e2e36325d2666683d3126663d3130'
	},
	N46: {
		id: 'N46',
		building: 'NDC',
		floor: 4,
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N46.ics?version=2023.0.7.0&icalsecurise=80A3821B8490CCFC258A464B5D92DB46347ACDE6D459D7F007AC182F80714D920FBF7C29281E0C72F6AB85A157267991&param=643d5b312e2e36325d2666683d3126663d3130'
	},
	N410: {
		id: 'N410',
		building: 'NDC',
		floor: 5,
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N410.ics?version=2023.0.7.0&icalsecurise=8F8A1034066AE5FA1C25F8F0D084B2F1A2432459B47F371F4B5DBAFEAFCB2E9A364AC4EE79533E7AF1F66AE56A31723E&param=643d5b312e2e36325d2666683d3126663d3130'
	},
	N411: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N411.ics?version=2023.0.7.0&icalsecurise=17C5FB8882D83F437FB1007B791BFF48E6E07F782EE30ACE8985B51FD9F8D24BF3C114B55DB63645FF3C19B3B830D1A8&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N411',
		building: 'NDC',
		floor: 5
	},

	N33: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N33.ics?version=2023.0.7.0&icalsecurise=2048944A9A52374F40FF5F267AB11DE8C0D5B9C9B539A2246FC3D74153CC4A34964BEF2D94D45935119B358F9D79F91E&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N33',
		building: 'NDC',
		floor: 3
	},
	N34: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N34.ics?version=2023.0.7.0&icalsecurise=80A3821B8490CCFC258A464B5D92DB4629F9F4D2788B28D62EDF09B9C82BAABB6AC17D671DB57E2580C8A603AFB723EC&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N34',
		building: 'NDC',
		floor: 3
	},
	N36: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N36.ics?version=2023.0.7.0&icalsecurise=2048944A9A52374F40FF5F267AB11DE8A655F7590B1F1D49F62DD598928DA246836502ADC1785C3FFEA9BDEBE3039C9B&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N36',
		building: 'NDC',
		floor: 3
	},
	N38: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N38.ics?version=2023.0.7.0&icalsecurise=2FA9991E31222E491264F279F9887C013E7BA4213E9E3555AA0F52D9E187753E3030C406F46993C274605296381F017E&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N38',
		building: 'NDC',
		floor: 3
	},

	N23: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N23.ics?version=2023.0.7.0&icalsecurise=17C5FB8882D83F437FB1007B791BFF4851EE8F7BEC5912E578029900B9869074046DBA886600D5BCE24B2C32C24AF0F9&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N23',
		building: 'NDC',
		floor: 2
	},
	N24: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N24.ics?version=2023.0.7.0&icalsecurise=8F8A1034066AE5FA1C25F8F0D084B2F134F9B45C58E99A6690A76790123BF585847ECDEC4DD16169FD703A6BE9C8F4FD&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N24',
		building: 'NDC',
		floor: 2
	},
	N26: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N26.ics?version=2023.0.7.0&icalsecurise=3EE1BD0D64016DC5CDCE370503D90273F940ACE27B1148B7A60CF7DFE842953ABA24C94C49CDC14659649F201106E42D&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N26',
		building: 'NDC',
		floor: 2
	},
	N28: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N28.ics?version=2023.0.7.0&icalsecurise=002EBAB8D772221921FC5687898703C814CBF166D34C23862C1C60F5C60ABF00801A8B1DF0D35BF5A2180759E9F1148D&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N28',
		building: 'NDC',
		floor: 2
	},

	N15: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N15.ics?version=2023.0.7.0&icalsecurise=0E3D8CB947DC9AFE3D7F5D835A1183AF2A122DAA4098D04CE8C2BAC3DFAF829ECD99C93F57A0BFDBC40D75AF063B62C5&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N15',
		building: 'NDC',
		floor: 1
	},
	N16A: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N16A.ics?version=2023.0.7.0&icalsecurise=2048944A9A52374F40FF5F267AB11DE8E94B69DEA04F4A48342B5778D95CADB8C7DD70CFB18F0E3499379B0B66106505&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N16A',
		building: 'NDC',
		floor: 1
	},
	N16B: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N16B.ics?version=2023.0.7.0&icalsecurise=002EBAB8D772221921FC5687898703C8DEF5E828A15B1BBA3323C6FC219F6D31282A0F20234A22D715485FB296AA3BE2&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N16B',
		building: 'NDC',
		floor: 1
	},
	N18: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N18.ics?version=2023.0.7.0&icalsecurise=726215D1801ED3365370D5995A5865F6399BBCD209D56E5C02BD8FFA8E15F32B340D65585033D7ABA26505D375869B29&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N18',
		building: 'NDC',
		floor: 1
	},
	N19: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_N19.ics?version=2023.0.7.0&icalsecurise=A7D5BB09520B333E7E456022DD6E6D6435E31121982F0EBAFE750C3A05B1C531D12975E1DA49C23D272A12BD2562B324&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'N19',
		building: 'NDC',
		floor: 1
	},

	L012: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L012.ics?version=2023.0.7.0&icalsecurise=6EBDFEE851E2ABA6D3BBE95A8CCA83145D14C744CF1F01E88758B06F3CE055FD6F4291E3A5E745E8C17DF4AB827F8F15&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L012',
		building: 'NDL',
		floor: 0
	},
	L016: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L016.ics?version=2023.0.7.0&icalsecurise=80C220731616F3916EA72303C06CF3BA88300C4272A47AAEBAEE49A65CEB072E04CF7365D8AA874343F88B02F47D5AA4&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L016',
		building: 'NDL',
		floor: 0
	},
	L017: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L017.ics?version=2023.0.7.0&icalsecurise=9C4D88A0347F58D3013A45766A7075A356FFDFED09C93593C53AB6E1A747990C3E3EFE0E85164B7FA8AB2352FE2D4625&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L017',
		building: 'NDL',
		floor: 0
	},
	L018: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L018_Salle_de_lecture.ics?version=2023.0.7.0&icalsecurise=9C4D88A0347F58D3013A45766A7075A3027BC142B7759292A79AC93F25693915A1813D335BA4DB2860BEC0EDF740D8B1&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L018',
		building: 'NDL',
		floor: 0
	},
	L108: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L108.ics?version=2023.0.7.0&icalsecurise=0116C13A9A5DD4A01EC6C1005F2C0A5E19C411A2700829A1F8C1E8E0EF18E895D6FD38662B6FE145C4A29FDAE0630DE7&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L108',
		building: 'NDL',
		floor: 1
	},
	L114: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L114.ics?version=2023.0.7.0&icalsecurise=834903FFC954DA8E8A09597B89CD72EC3FF87412916FB0879133AA27A475314FAC69DA096CB979EDFD040C67703D6881&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L114',
		building: 'NDL',
		floor: 1
	},
	L115: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L115.ics?version=2023.0.7.0&icalsecurise=0116C13A9A5DD4A01EC6C1005F2C0A5EBD4773A79AF421EC1FDDB53979CD7B273F69471836BEA302CB72FF1D285A8998&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L115',
		building: 'NDL',
		floor: 1
	},
	L206: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L206.ics?version=2023.0.7.0&icalsecurise=091657B2020FCC2FE3B91DB81831F7424A1738C289FF0C570AAA4124DA964B5AEDB9723467907EA01CCAD82834B0DFFF&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L206',
		building: 'NDL',
		floor: 2
	},
	L207: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L207.ics?version=2023.0.7.0&icalsecurise=219B22E7F74A66A8A260B976A502DA41F1A35E8D30B5AA8C1B08861DDBC1CC01F341B5DA13A1BE9C897492C2E8500D84&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L207',
		building: 'NDL',
		floor: 2
	},
	L212: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L212.ics?version=2023.0.7.0&icalsecurise=6EBDFEE851E2ABA6D3BBE95A8CCA8314804D2C9F0412FC15A9B1774A2C96A3145D561CBD8CDE55EE8D693121D062F5DC&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L212',
		building: 'NDL',
		floor: 2
	},
	L213: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L213.ics?version=2023.0.7.0&icalsecurise=2B44A7996D07EA47FF19F0AEE5EE2648036BFC7AECF654C05D2123825E26ED6FF21FB50B88341ED36EC3CF91F8AC2279&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L213',
		building: 'NDL',
		floor: 2
	},
	L220: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L220.ics?version=2023.0.7.0&icalsecurise=9C4D88A0347F58D3013A45766A7075A300DD1ECF97D588E261FDA1976923FD81EFB02E933EB09D2B6E05438FDBD9E3DB&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L220',
		building: 'NDL',
		floor: 2
	},
	L305: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L305.ics?version=2023.0.7.0&icalsecurise=091657B2020FCC2FE3B91DB81831F742ED5ED4288B433A9B306CB45AF79A47EA62664DAF2B7F0ED35769CE2C8FC226C4&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L305',
		building: 'NDL',
		floor: 3
	},
	L306: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L306.ics?version=2023.0.7.0&icalsecurise=AA78FDB14C4AE1D324DE356666D214C20703609A7749CF5E55CA9B5DBB5C72E3825FE5B09A6029CF7EE8AC89D95EE6E2&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L306',
		building: 'NDL',
		floor: 3
	},
	L311: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L311.ics?version=2023.0.7.0&icalsecurise=6EBDFEE851E2ABA6D3BBE95A8CCA8314EA415AFFD977E8B2136662A60664009650D0205B44C9C87AE778F9896152024E&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L311',
		building: 'NDL',
		floor: 3
	},
	L312: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L312.ics?version=2023.0.7.0&icalsecurise=2B44A7996D07EA47FF19F0AEE5EE2648027240ADE6D876AD308A74F3A81189461E4681B4A64722833A23A5F9F661EEFF&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L312',
		building: 'NDL',
		floor: 3
	},
	L313: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L313.ics?version=2023.0.7.0&icalsecurise=2B44A7996D07EA47FF19F0AEE5EE26488FAC2A0083FAD10C4A701B4AB91EE3C2E83E965B315B3B0EFDBEB7D7FC4C5FD9&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L313',
		building: 'NDL',
		floor: 3
	},
	L416: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L416.ics?version=2023.0.7.0&icalsecurise=9C4D88A0347F58D3013A45766A7075A3D2F0681EAB29DCB38998F0BA10EF1F481C89370F1A614D6072F2D83D751C2176&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L416',
		building: 'NDL',
		floor: 4
	},
	L417: {
		ical: 'https://planning-2324.isep.fr/Telechargements/ical/Edt_L417.ics?version=2023.0.7.0&icalsecurise=9B8F9E7BB01F83CE8A78EA7BF384C921F52C91E53C6CA1CCC5093FA31C5DC401BE567F623F448D24BB306E6EB4A054A1&param=643d5b312e2e36325d2666683d3126663d3130',
		id: 'L417',
		building: 'NDL',
		floor: 4
	}
};

export const OLD_ROOM_CONFIG = {
	NDC: {
		N15: {
			floor: 1,
			urlId: 'F965F00262947E391A246D2457B69710'
		},
		N16A: {
			floor: 1,
			urlId: '9D899E90DE9E91D6C5CAB361058F32B4'
		},
		N16B: {
			floor: 1,
			urlId: 'D986F82B93EECC39F1ABC2FDEC343C23'
		},
		N18: {
			floor: 1,
			urlId: 'ABEAEC630D506AF7DD9862AB5EE5C906'
		},
		N24: {
			floor: 2,
			urlId: '5D947CE83274607277AD01D70F2C459A'
		},
		N26: {
			floor: 2,
			urlId: '38C3E170CA0A0E1E9AE82556212D8155'
		},
		N28: {
			floor: 2,
			urlId: '7165D289E35F56674B4D8E412312EDD0'
		},
		N33: {
			floor: 3,
			urlId: '36337ECBE92FFEF042A97C9E6FFB604F'
		},
		N34: {
			floor: 3,
			urlId: 'F24628320A77AC422CA6B45EA19FD6EA'
		},
		N36: {
			floor: 3,
			urlId: '2A00CCCA8D2AED4FAF55B6974C3E0D10'
		},
		N38: {
			floor: 3,
			urlId: '7165D289E35F56674B4D8E412312EDD0'
		},
		// N39: {
		//   floor: 3,
		//   urlId: "88000209412DADF53FA6E61E0CEEBCE2",
		// },
		N43: {
			floor: 4,
			urlId: '8F6B7DFEE50D732CE14B976B7DA93BA8'
		},
		N44: {
			floor: 4,
			urlId: 'E4E0323659CADBB30D06BC95F4A99631'
		},
		N46: {
			floor: 4,
			urlId: '160C6FD614F5B57E8626021CA3263A0B'
		},
		N48: {
			floor: 4,
			urlId: '471294D606BE8683C19FB6BE48323E53'
		},
		N410: {
			floor: 5,
			urlId: 'F868D41EB57C391706B9EBCC96FB248D'
		},
		N411: {
			floor: 5,
			urlId: 'DF27091349DF6BF7A877BECD2D714F01'
		}
	},
	NDL: {
		L012: {
			floor: 0,
			urlId: '0B288A81494FBC4802C5EEA48257B425'
		},
		L016: {
			floor: 0,
			urlId: '91CC46BFB1976D31BA5CC391CC6D609C'
		},
		L017: {
			floor: 0,
			urlId: '1515C5B117E9B4F40F04FA44A7F644C7'
		},
		L018: {
			floor: 0,
			urlId: '880B8DD3F0646F6249ACCF5BFFC422EE'
		},
		L108: {
			floor: 1,
			urlId: '82D11A447F07B64597246E94F2C82C95'
		},
		L114: {
			floor: 1,
			urlId: '2512E34D0B9E00283753F1D30F7C2406'
		},
		L115: {
			floor: 1,
			urlId: '07A83CF5464AD5E9F2C1D92489C031AE'
		},
		L122: {
			floor: 1,
			urlId: 'A21B45139E01A0BC0F28397B0B489BA1'
		},
		L206: {
			floor: 2,
			urlId: '79D6BB64F18BB35D0A6ED410262D0096'
		},
		L207: {
			floor: 2,
			urlId: '92896397F82E1987F86D76971DAC4C03'
		},
		L212: {
			floor: 2,
			urlId: '35194AA261070CA3ABE12E8B9C7A6E98'
		},
		L213: {
			floor: 2,
			urlId: 'C06EB9DC8C29A9F51673E3AF88E60D65'
		},
		L220: {
			floor: 2,
			urlId: 'F6FA0187F6800446BEC128013B4FA96B'
		},
		L305: {
			floor: 3,
			urlId: '4FF1BF1604B83CD595F869A5EA13583F'
		},
		L306: {
			floor: 3,
			urlId: '36C02F9AE32BB25FB0D26D3D889026A8'
		},
		L311: {
			floor: 3,
			urlId: 'BFAA71953B9623A5C00223981A14E2F9'
		},
		L312: {
			floor: 3,
			urlId: '8E51799B7DC916880D693729C2C691FE'
		},
		L313: {
			floor: 3,
			urlId: '4BE3FF058E583610DE193F713E3FF440'
		},
		L416: {
			floor: 4,
			urlId: '0192287ECE0F89555AB91025F3A85E1D'
		},
		L417: {
			floor: 4,
			urlId: '32347A59C74400C25822FDD92B557C4C'
		}
	}
};
