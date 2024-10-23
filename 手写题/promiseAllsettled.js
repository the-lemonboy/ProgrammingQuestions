Promise.myAllSettled = function (alls) {
    return new Promise(async (resolve, reject) => {
      const res = [];
      alls.forEach(async (pr, index) => {
        try {
          const value = await pr;
          res.splice(index, 0, { status: "fulfilled", value });
          if (res.length === alls.length) {
            resolve(res);
          }
        } catch (reason) {
          res.splice(index, 0, { status: "rejected", reason });
          if (res.length === alls.length) {
            resolve(res);
          }
        }
      });
    });
  };


  