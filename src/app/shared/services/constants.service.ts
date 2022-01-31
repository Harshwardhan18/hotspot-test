import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ConstantType} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constantTypeList: Array<string>;
  constantList: any = {};

  constructor(
    private apollo: Apollo
  ) {
    this.constantTypeList = [];
    this.loadConstantList(this.constantTypeList);
  }


  async loadConstantList(constantTypeList) {
    const localVersion = localStorage.getItem('constantVersion');
    const version = await this.getVersion();
    localStorage.setItem('constantVersion', `${version}`);

    constantTypeList.forEach(constantType => {
      const list = localStorage.getItem(constantType);
      if (list && +localVersion === +version) {
        this.constantList[constantType] = list;
      } else {
        this.setConstantList(constantType);
      }
    });
  }


  setConstantList(type) {

    // Uncommented this code and added your ConstantListQuery
    // const variables = {
    //   type_id: type,
    //   per_page: 2000
    // };
    // this.apollo.query({
    //   query: ConstantListQuery,
    //   variables
    // })
    // .pipe(
    //   map(data => data.data),
    //   filter(data => !!data)
    // )
    // .subscribe((data: any) => {
    //   const constantList = data.constantList;
    //   this.constantList[type] = constantList.data;
    //   this.localStorage.store(type, this.constantList[type]);
    // }, err => {
    //   console.log('Error fetching constants: ', err);
    // });
  }


  getConstant(type): Promise<Array<ConstantType>> {
    const list: any = JSON.parse(localStorage.getItem(type));

    return new Promise(async (resolve, reject) => {
      const localVersion = localStorage.getItem('constantVersion');
      const version = await this.getVersion();
      localStorage.setItem('constantVersion', `${version}`);

      if (list && +localVersion === +version) {
        return resolve(list);
      }
      const variables = {
        type_id: type,
        per_page: 2000
      };
      // Uncommented this code and added your ConstantListQuery
      // this.apollo.query({
      //   query: ConstantListQuery,
      //   variables
      // })
      // .subscribe((data: any) => {
      //   if (data) {
      //     const constantList = data.constantList;
      //     this.constantList[type] = constantList.data;
      //     this.localStorage.store(type, this.constantList[type]);
      //     resolve(this.constantList[type]);
      //   }
      // });
    });
  }

  getVersion() {
    // Uncommented this code and added your ConstantVersionQuery
    // return this.apollo.query({
    //   query: ConstantVersionQuery
    // })
    // .pipe(
    //   map(data => data.constantVersion)
    // )
    // .toPromise();
  }

}
