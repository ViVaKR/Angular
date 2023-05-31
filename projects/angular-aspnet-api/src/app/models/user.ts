export class User {
  /**
   * 
   * @param id  아이디 
   * @param fullName  이름
   * @param userName  이메일
   * @param email  이메일
   */

  constructor(
    public id: string,        // 아이디
    public fullName: string,  // 이름
    public userName: string,  // == 이메일
    public email: string      // 이메일
  ) {}
}
