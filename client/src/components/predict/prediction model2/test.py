import csv

with open('final.csv', 'r') as fin, open('final2.csv', 'w', newline='') as fout:

    # define reader and writer objects
    reader = csv.reader(fin, skipinitialspace=True)
    writer = csv.writer(fout, delimiter=',')

    # write headers
    writer.writerow(next(reader))

    # iterate and write rows based on condition
    for i in reader:
        if (i[0] =='Flat'):
            i[0]=0
        else:
            i[0]=1

        if (i[1]=='Islamabad'):
            i[1]=1
        
        if (i[1]=='Rawalpindi'):
            i[1]=2
        if (i[1]=='Lahore'):
            i[1]=3
        if (i[1]=='Karachi'):
            i[1]=4
        writer.writerow(i)
            